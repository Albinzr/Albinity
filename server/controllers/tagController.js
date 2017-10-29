import Tag from '../model/tagModel'
import Post from '../model/postModel'
import mongoose from 'mongoose'
const { Schema } = mongoose

const tagController = {}

//NOTE: createTag

tagController.createTag = (req, res) => {
	const nameArray = JSON.parse(req.body.tags)
	console.log(typeof nameArray)
	var bulkTag = []
	nameArray.forEach((tagName, index) => {
		let name = tagName.toLowerCase()
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
				message: 'Could not save the tag, try after sometime',
				error: error
			})
		})
}

//NOTE: getTags

tagController.getTags = (req, res) => {
	Tag.find((error, post) => {
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
	})
}

//NOTE: displayByTag

tagController.displayByTag = (req, res) => {
	const name = req.params.tag
	let offset = parseInt(req.param('offset'))
	let limit = parseInt(req.param('limit'))
	Tag.findOne(
		{
			name: name
		},
		(error, tag) => {
			console.log(tag, 'incoming tag details')
			if (error == null && tag != null) {
				Post.find(
					{
						tags: tag._id
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
					.populate('author')
					.populate('tags')
					.populate('category')
					.skip(offset)
					.limit(limit)
			} else {
				console.log('no success')
				res.status(400).json({
					success: false,
					message: 'Dose not exist.',
					error: error
				})
			}
		}
	)
}

export default tagController
