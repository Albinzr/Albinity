import Category from '../model/categoryModel'
import Post from '../model/postModel'
import mongoose from 'mongoose'
const { Schema } = mongoose

const categoryController = {}

//NOTE: createCategory

categoryController.createCategory = (req, res) => {
	const categoryName = req.body.name
	let name = categoryName.toLowerCase()
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
				message: 'Could not save the tag, try after sometime',
				error: error
			})
		})
}

//NOTE: getCategory

categoryController.getCategory = (req, res) => {
	Category.find((error, post) => {
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

//NOTE: displayByCategory

categoryController.displayByCategory = (req, res) => {
	const name = req.params.category
	let offset = parseInt(req.param('offset'))
	let limit = parseInt(req.param('limit'))
	console.log(name)
	Category.findOne(
		{
			name: name
		},
		(error, category) => {
			console.log('this is result', category)
			if (error == null && category != null) {
				Post.find(
					{
						category: category._id
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

export default categoryController
