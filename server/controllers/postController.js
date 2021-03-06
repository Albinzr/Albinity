import Post from '../model/postModel'
import Tag from '../model/tagModel'
import Category from '../model/categoryModel'
import slug from 'slug'
import mongoose from 'mongoose'
const { Schema } = mongoose

const postController = {}

//NOTE: createPost

postController.createPost = (req, res) => {
	if (req.session.userId) {
		//console.log('this is the current user id ', req.session.userId)
		const {
			heading,
			subHeading,
			context,
			section,
			tags,
			active,
			mainImage,
			category
		} = req.body

		let post = new Post({
			heading,
			subHeading,
			context,
			active,
			mainImage
		})
		post.author = req.session.userId
		post.slug =
			slug(heading) +
			'_' +
			Math.random()
				.toString(36)
				.substring(7)

		const tagArray = JSON.parse(tags)
		let tagIds = []

		Tag.find({ name: { $in: tagArray } }, (err, tags) => {
			//console.log('Checking for tag', tags, err + 'found')
			return tags
		})
			.then(tags => {
				let existingTagName = []
				tags.filter(existingTag => {
					existingTagName.push(existingTag.name)
					tagIds.push(existingTag._id)
				})
				//console.log('found tag in db', existingTagName)
				return existingTagName
			})
			.then(existingTagName => {
				let newTagArray = []
				newTagArray = tagArray.filter(name => {
					return !existingTagName.includes(name)
				})
				//console.log('found tag not in db', newTagArray)
				return newTagArray //
			})
			.then(newTagArray => {
				let tagArray = newTagArray.filter(function(str) {
					return /\S/.test(str)
				})
				//console.log('removed empty white space', tagArray)

				let tagObject = []
				if (Object.keys(tagArray).length > 0) {
					newTagArray.forEach((tagName, index) => {
						let name = tagName.toLowerCase()
						let tag = new Tag({
							name
						})
						tagObject.push(tag)
					})
				}
				//console.log('new tag object for creating new tags', tagObject)
				return tagObject
			})
			.then(tagObject => {
				let newtagObject = []

				return new Promise(function(resolve, reject) {
					Tag.insertMany(tagObject, (error, tags) => {
						if (tags == undefined) {
							//console.log('cannot post tag object reason', error, newtagObject)
							resolve(newtagObject)
						} else {
							//console.log(' post tag object success', tags)
							return resolve(tags)
						}
					})
				})
			})
			.then(newtagObject => {
				newtagObject.filter(existingTag => {
					tagIds.push(existingTag._id)
				})
				//console.log('Total tag id for the post', tagIds)
				return tagIds
			})
			.then(tagIds => {
				//console.log(6, tagIds)
				let tagObjectIds = []
				tagIds.forEach(id => {
					tagObjectIds.push(mongoose.Types.ObjectId(id))
				})
				//console.log('Total tag id for the post with object id', tagIds)
				return tagObjectIds
			})
			.then(tagObjectIds => {
				//console.log(typeof tagObjectIds)
				post.tags = tagObjectIds
			})
			.then(() => {
				const selectedCategories = JSON.parse(category)
				let categoryArray = selectedCategories.filter(function(str) {
					return /\S/.test(str)
				})

				return categoryArray
			})
			.then(categoryObject => {
				post.category = categoryObject
			})
			.then(() => {
				post
					.save()
					.then(newPost => {
						res.status(200).json({
							success: true,
							data: newPost
						})
					})
					.catch(error => {
						return res.status(403).json({
							success: false,
							message: 'Could not save your post, try after sometime',
							error: error
						})
					})
			})
	} else {
		return res.status(403).json({
			success: false,
			message: 'You are not logged in.',
			error: error
		})
	}
}

//NOTE: displayPosts

postController.displayPosts = (req, res) => {
	let offset = parseInt(req.param('offset'))
	let limit = parseInt(req.param('limit'))

	Post.find(
		{
			active: true
		},
		'author tags category publishedDate mainImage heading subHeading slug',
		(error, post) => {
			if (error == null) {
				res.status(200).json({
					success: true,
					data: post
				})
			} else {
				res.status(400).json({
					success: false,
					message: 'Dose not exist.',
					error: error
				})
			}
		}
	)
		.sort({ publishedDate: -1 })
		.populate('author')
		.populate('tags')
		.populate('category')
		.skip(offset)
		.limit(limit)
}

//NOTE: detailedPost

postController.detailedPost = (req, res) => {
	const slug = req.params.slug
	//console.log(slug)
	Post.findOne(
		{
			slug: slug
		},
		(error, post) => {
			if (error == null) {
				//console.log(post)
				res.status(200).json({
					success: true,
					data: post,
					error: error
				})
			} else {
				res.status(400).json({
					success: false,
					message: 'Dose not exist.',
					error: error
				})
			}
		}
	)
		.populate('author')
		.populate('tags')
		.populate('category')
}

//NOTE: updatePost

postController.updatePost = (req, res) => {
	const { id, heading, subHeading, context, section, tags } = req.body

	//console.log('update')

	Post.findOne(
		{
			_id: id
		},
		(error, post) => {
			if (error == null) {
				post.heading = heading
				post.subHeading = subHeading
				post.context = context
				post.section = section
				post.tags = tags

				post
					.save()
					.then(newAffliction => {
						res.status(200).json({
							success: true,
							data: 'Updated successfully'
						})
					})
					.catch(error => {
						return res.status(501).json({
							success: false,
							message: "Couldn't update post. Try again after sometime.",
							error: error
						})
					})
			} else {
				res.status(400).json({
					success: false,
					message: 'post dose not exist.',
					error: error
				})
			}
		}
	)
}

//NOTE: deletePost

postController.deletePost = (req, res) => {
	const { id } = req.body

	Post.findOne(
		{
			_id: id
		},
		(res, error) => {
			if (error == null) {
				post.active = false
				post.save().then(data => {
					res.status(200).json({
						success: true,
						data: 'removed successfully'
					})
				})
			} else {
				res.status(400).json({
					success: false,
					message: 'post dose not exist.',
					error: error
				})
			}
		}
	)
}

export default postController
