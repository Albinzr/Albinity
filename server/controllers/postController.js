import Post from "../model/postModel"
import Tag from "../model/tagModel"
import Category from "../model/categoryModel"
import slug from "slug"
import mongoose from "mongoose"
const { Schema } = mongoose

const postController = {}

postController.createPost = (req, res) => {
	const {
		heading,
		subHeading,
		context,
		section,
		tags,
		active,
		mainImage
	} = req.body

	let post = new Post({
		heading,
		subHeading,
		context,
		active,
		mainImage
	})

	post.author = req.session.userId
	post.slug = slug(heading) + "_" + Math.random().toString(36).substring(7)

	const tagArray = JSON.parse(tags)
	let tagIds = []

	Tag.find({ name: { $in: tagArray } }, (err, tags) => {
		console.log("Checking for tag", tags, err + "found")
		return tags
	})
		.then(tags => {
			let existingTagName = []
			tags.filter(existingTag => {
				existingTagName.push(existingTag.name)
				tagIds.push(existingTag._id)
			})
			console.log("found tag in db", existingTagName)
			return existingTagName
		})
		.then(existingTagName => {
			let newTagArray = []
			newTagArray = tagArray.filter(name => {
				return !existingTagName.includes(name)
			})
			console.log("found tag not in db", newTagArray)
			return newTagArray //
		})
		.then(newTagArray => {
			let tagArray = newTagArray.filter(function(str) {
				return /\S/.test(str)
			})
			console.log("removed empty white space", tagArray)

			let tagObject = []
			if (Object.keys(tagArray).length > 0) {
				console.log(Object.keys(newTagArray).length)
				newTagArray.forEach((name, index) => {
					let tag = new Tag({
						name
					})
					tagObject.push(tag)
				})
			}
			console.log("new tag object for creating new tags", tagObject)
			return tagObject
		})
		.then(tagObject => {
			let newtagObject = []

			return new Promise(function(resolve, reject) {
				Tag.insertMany(tagObject, (error, tags) => {
					if (tags == undefined) {
						console.log(
							"cannot post tag object reason",
							error,
							newtagObject
						)
						resolve(newtagObject)
					} else {
						console.log(" post tag object success", tags)
						return resolve(tags)
					}
				})
			})
		})
		.then(newtagObject => {
			newtagObject.filter(existingTag => {
				tagIds.push(existingTag._id)
			})
			console.log("Total tag id for the post", tagIds)
			return tagIds
		})
		.then(tagIds => {
			console.log(6, tagIds)
			let tagObjectIds = []
			tagIds.forEach(id => {
				tagObjectIds.push(mongoose.Types.ObjectId(id))
			})
			console.log("Total tag id for the post with object id", tagIds)
			return tagObjectIds
		})
		.then(tagObjectIds => {
			console.log(typeof tagObjectIds)
			post.tags = tagObjectIds
		})
		.then(() => {
			post.category = [
				mongoose.Types.ObjectId("59a18b13e52e0c3879633d55"),
				mongoose.Types.ObjectId("59a18ac5e947b438756516b5")
			]
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
						message: "Could not save your post, try after sometime",
						error: error
					})
				})
		})

	// .then(tagArray => {
	// console.log("rechec to post", tagArray)

	// post.tags = [
	// 	mongoose.Types.ObjectId("59a18b13e52e0c3879633d55"),
	// 	mongoose.Types.ObjectId("59a18ac5e947b438756516b5")
	// ]
}

postController.display = (req, res) => {
	let offset = parseInt(req.param("offset"))
	let limit = parseInt(req.param("limit"))

	Post.find(
		{
			active: true
		},
		(error, post) => {
			if (error == null) {
				res.status(200).json({
					success: true,
					data: post
				})
			} else {
				res.status(400).json({
					success: false,
					message: "Dose not exist.",
					error: error
				})
			}
		}
	)
		.populate("author")
		.populate("tags")
		.populate("category")
		.skip(offset)
		.limit(limit)
}

postController.detailedPost = (req, res) => {
	const slug = req.params.slug
	console.log(slug)
	Post.findOne(
		{
			slug: slug
		},
		(error, post) => {
			if (error == null) {
				console.log(post)
				res.status(200).json({
					success: true,
					data: post,
					error: error
				})
			} else {
				res.status(400).json({
					success: false,
					message: "Dose not exist.",
					error: error
				})
			}
		}
	)
		.populate("author")
		.populate("tags")
		.populate("category")
}

postController.update = (req, res) => {
	const { id, heading, subHeading, context, section, tags } = req.body

	console.log("update")

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
							data: "Updated successfully"
						})
					})
					.catch(error => {
						return res.status(501).json({
							success: false,
							message:
								"Couldn't update post. Try again after sometime.",
							error: error
						})
					})
			} else {
				res.status(400).json({
					success: false,
					message: "post dose not exist.",
					error: error
				})
			}
		}
	)
}
postController.delete = (req, res) => {
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
						data: "removed successfully"
					})
				})
			} else {
				res.status(400).json({
					success: false,
					message: "post dose not exist.",
					error: error
				})
			}
		}
	)
}

postController.createTag = (req, res) => {
	const nameArray = JSON.parse(req.body.tags)
	console.log(typeof nameArray)
	var bulkTag = []
	nameArray.forEach((name, index) => {
		console.log(name)
		let tag = new Tag({
			name
		})
		bulkTag.push(tag)
	})
	console.log(bulkTag)

	Tag.insertMany(bulkTag)
		.then(newPost => {
			res.status(200).json({
				success: true,
				data: newPost
			})
		})
		.catch(error => {
			return res.status(403).json({
				success: false,
				message: "Could not save the tag, try after sometime",
				error: error
			})
		})
}
postController.getTags = (req, res) => {
	Tag.find((error, post) => {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			})
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			})
		}
	})
}

postController.createCategory = (req, res) => {
	const { name } = req.body

	let category = new Category({
		name
	})

	category
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
				message: "Could not save the tag, try after sometime",
				error: error
			})
		})
}
postController.getCategory = (req, res) => {
	Category.find((error, post) => {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			})
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			})
		}
	})
}

export default postController
