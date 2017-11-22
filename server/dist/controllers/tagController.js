'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tagModel = require('../model/tagModel');

var _tagModel2 = _interopRequireDefault(_tagModel);

var _postModel = require('../model/postModel');

var _postModel2 = _interopRequireDefault(_postModel);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var tagController = {};

//NOTE: createTag

tagController.createTag = function (req, res) {
	var nameArray = JSON.parse(req.body.tags);
	console.log(typeof nameArray === 'undefined' ? 'undefined' : _typeof(nameArray));
	var bulkTag = [];
	nameArray.forEach(function (tagName, index) {
		var name = tagName.toLowerCase();
		var tag = new _tagModel2.default({
			name: name
		});
		bulkTag.push(tag);
	});
	console.log(bulkTag);

	_tagModel2.default.insertMany(bulkTag).then(function (newPost) {
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

//NOTE: getTags

tagController.getTags = function (req, res) {
	_tagModel2.default.find(function (error, post) {
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

//NOTE: displayByTag

tagController.displayByTag = function (req, res) {
	var name = req.params.tag;
	var offset = parseInt(req.param('offset'));
	var limit = parseInt(req.param('limit'));
	_tagModel2.default.findOne({
		name: name
	}, function (error, tag) {
		console.log(tag, 'incoming tag details');
		if (error == null && tag != null) {
			_postModel2.default.find({
				tags: tag._id
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

exports.default = tagController;