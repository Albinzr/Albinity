import express from 'express'
import path from 'path'
import {
	userController,
	searchController,
	postController,
	uploadController,
	categoryController,
	tagController
} from './controllers/index'

// NOTE - Image processing imports
import multer from 'multer'
import crypto from 'crypto'

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		require('fs').mkdir('uploads/' + req.session.username + '/', err => {
			cb(null, './uploads/' + req.session.username + '/')
		})
	},
	filename: (req, file, cb) => {
		crypto.pseudoRandomBytes(16, (err, raw) => {
			if (err) return cb(err)
			const newPath = raw.toString('hex') + path.extname(file.originalname)
			cb(null, newPath)
		})
	}
})

var upload = multer({
	storage: storage
})

module.exports = function(app) {
	//NOTE - Auth -
	app.post('/api/login', userController.login)
	app.get('/api/logout', userController.logout)
	app.post('/api/register', userController.register)

	//NOTE - Create -
	app.use('/uploads', express.static(__dirname + '/uploads'))

	app.post(
		'/profile',
		upload.single('image'),
		uploadController.uploadBlogImages
	)

	app.post('/api/post', postController.createPost)
	app.get('/api/post/:slug', postController.detailedPost)
	app.get('/api/post', postController.displayPosts)
	app.post('/api/post/update', postController.updatePost)
	app.post('/api/post/delete', postController.deletePost)

	//NOTE - Tag
	app.post('/api/tag', tagController.createTag)
	app.get('/api/tag', tagController.getTags)

	//NOTE - Category
	app.post('/api/category', categoryController.createCategory)
	app.get('/api/category', categoryController.getCategory)

	//NOTE - Search -
	app.get('/api/search/:key', searchController.fuzzySearch)
	app.get('/api/tag/:tag', tagController.displayByTag)
	app.get('/api/category/:category', categoryController.displayByCategory)
}
