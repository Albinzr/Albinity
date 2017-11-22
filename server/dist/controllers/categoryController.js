'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _categoryModel = require('../model/categoryModel');

var _categoryModel2 = _interopRequireDefault(_categoryModel);

var _postModel = require('../model/postModel');

var _postModel2 = _interopRequireDefault(_postModel);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var categoryController = {};

//NOTE: createCategory

categoryController.createCategory = function (req, res) {
	var categoryName = req.body.name;
	var name = categoryName.toLowerCase();
	var category = new _categoryModel2.default({
		name: name
	});

	category.save().then(function (newPost) {
		res.status(200).json({
			success: true,
			data: newPost
		});
	}).catch(function (error) {
		return res.status(403).json({
			success: false,
			message: 'Could not save the tag, try after sometime',
			error: error
		});
	});
};

//NOTE: getCategory

categoryController.getCategory = function (req, res) {
	_categoryModel2.default.find(function (error, post) {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Dose not exist.',
				error: error
			});
		}
	});
};

//NOTE: displayByCategory

categoryController.displayByCategory = function (req, res) {
	var name = req.params.category;
	var offset = parseInt(req.param('offset'));
	var limit = parseInt(req.param('limit'));
	console.log(name);
	_categoryModel2.default.findOne({
		name: name
	}, function (error, category) {
		console.log('this is result', category);
		if (error == null && category != null) {
			_postModel2.default.find({
				category: category._id
			}, 'author tags category publishedDate mainImage heading subHeading slug', function (error, post) {
				if (error == null) {
					res.status(200).json({
						success: true,
						data: post
					});
				} else {
					res.status(400).json({
						success: false,
						message: 'Dose not exist.',
						error: error
					});
				}
			}).sort({ publishedDate: -1 }).populate('author').populate('tags').populate('category').skip(offset).limit(limit);
		} else {
			console.log('no success');
			res.status(400).json({
				success: false,
				message: 'Dose not exist.',
				error: error
			});
		}
	});
};

exports.default = categoryController;