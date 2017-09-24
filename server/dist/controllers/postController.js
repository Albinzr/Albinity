"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _postModel = require("../model/postModel");

var _postModel2 = _interopRequireDefault(_postModel);

var _tagModel = require("../model/tagModel");

var _tagModel2 = _interopRequireDefault(_tagModel);

var _categoryModel = require("../model/categoryModel");

var _categoryModel2 = _interopRequireDefault(_categoryModel);

var _slug = require("slug");

var _slug2 = _interopRequireDefault(_slug);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var postController = {};

postController.createPost = function (req, res) {
	var _req$body = req.body,
	    heading = _req$body.heading,
	    subHeading = _req$body.subHeading,
	    context = _req$body.context,
	    section = _req$body.section,
	    tags = _req$body.tags,
	    active = _req$body.active,
	    mainImage = _req$body.mainImage,
	    category = _req$body.category;


	var post = new _postModel2.default({
		heading: heading,
		subHeading: subHeading,
		context: context,
		active: active,
		mainImage: mainImage
	});
	post.author = req.session.userId;
	post.slug = (0, _slug2.default)(heading) + "_" + Math.random().toString(36).substring(7);

	var tagArray = JSON.parse(tags);
	var tagIds = [];

	_tagModel2.default.find({ name: { $in: tagArray } }, function (err, tags) {
		console.log("Checking for tag", tags, err + "found");
		return tags;
	}).then(function (tags) {
		var existingTagName = [];
		tags.filter(function (existingTag) {
			existingTagName.push(existingTag.name);
			tagIds.push(existingTag._id);
		});
		console.log("found tag in db", existingTagName);
		return existingTagName;
	}).then(function (existingTagName) {
		var newTagArray = [];
		newTagArray = tagArray.filter(function (name) {
			return !existingTagName.includes(name);
		});
		console.log("found tag not in db", newTagArray);
		return newTagArray; //
	}).then(function (newTagArray) {
		var tagArray = newTagArray.filter(function (str) {
			return (/\S/.test(str)
			);
		});
		console.log("removed empty white space", tagArray);

		var tagObject = [];
		if (Object.keys(tagArray).length > 0) {
			newTagArray.forEach(function (tagName, index) {
				var name = tagName.toLowerCase();
				var tag = new _tagModel2.default({
					name: name
				});
				tagObject.push(tag);
			});
		}
		console.log("new tag object for creating new tags", tagObject);
		return tagObject;
	}).then(function (tagObject) {
		var newtagObject = [];

		return new Promise(function (resolve, reject) {
			_tagModel2.default.insertMany(tagObject, function (error, tags) {
				if (tags == undefined) {
					console.log("cannot post tag object reason", error, newtagObject);
					resolve(newtagObject);
				} else {
					console.log(" post tag object success", tags);
					return resolve(tags);
				}
			});
		});
	}).then(function (newtagObject) {
		newtagObject.filter(function (existingTag) {
			tagIds.push(existingTag._id);
		});
		console.log("Total tag id for the post", tagIds);
		return tagIds;
	}).then(function (tagIds) {
		console.log(6, tagIds);
		var tagObjectIds = [];
		tagIds.forEach(function (id) {
			tagObjectIds.push(_mongoose2.default.Types.ObjectId(id));
		});
		console.log("Total tag id for the post with object id", tagIds);
		return tagObjectIds;
	}).then(function (tagObjectIds) {
		console.log(typeof tagObjectIds === "undefined" ? "undefined" : _typeof(tagObjectIds));
		post.tags = tagObjectIds;
	}).then(function () {
		var selectedCategories = JSON.parse(category);
		var categoryArray = selectedCategories.filter(function (str) {
			return (/\S/.test(str)
			);
		});

		return categoryArray;
	}).then(function (categoryObject) {
		post.category = categoryObject;
	}).then(function () {
		post.save().then(function (newPost) {
			res.status(200).json({
				success: true,
				data: newPost
			});
		}).catch(function (error) {
			return res.status(403).json({
				success: false,
				message: "Could not save your post, try after sometime",
				error: error
			});
		});
	});

	// .then(tagArray => {
	// console.log("rechec to post", tagArray)

	// post.tags = [
	// 	mongoose.Types.ObjectId("59a18b13e52e0c3879633d55"),
	// 	mongoose.Types.ObjectId("59a18ac5e947b438756516b5")
	// ]
};

postController.display = function (req, res) {
	var offset = parseInt(req.param("offset"));
	var limit = parseInt(req.param("limit"));

	_postModel2.default.find({
		active: true
	}, "author tags category publishedDate mainImage heading subHeading slug", function (error, post) {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	}).populate("author").populate("tags").populate("category").skip(offset).limit(limit);
};

postController.detailedPost = function (req, res) {
	var slug = req.params.slug;
	console.log(slug);
	_postModel2.default.findOne({
		slug: slug
	}, function (error, post) {
		if (error == null) {
			console.log(post);
			res.status(200).json({
				success: true,
				data: post,
				error: error
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	}).populate("author").populate("tags").populate("category");
};

postController.update = function (req, res) {
	var _req$body2 = req.body,
	    id = _req$body2.id,
	    heading = _req$body2.heading,
	    subHeading = _req$body2.subHeading,
	    context = _req$body2.context,
	    section = _req$body2.section,
	    tags = _req$body2.tags;


	console.log("update");

	_postModel2.default.findOne({
		_id: id
	}, function (error, post) {
		if (error == null) {
			post.heading = heading;
			post.subHeading = subHeading;
			post.context = context;
			post.section = section;
			post.tags = tags;

			post.save().then(function (newAffliction) {
				res.status(200).json({
					success: true,
					data: "Updated successfully"
				});
			}).catch(function (error) {
				return res.status(501).json({
					success: false,
					message: "Couldn't update post. Try again after sometime.",
					error: error
				});
			});
		} else {
			res.status(400).json({
				success: false,
				message: "post dose not exist.",
				error: error
			});
		}
	});
};
postController.delete = function (req, res) {
	var id = req.body.id;


	_postModel2.default.findOne({
		_id: id
	}, function (res, error) {
		if (error == null) {
			post.active = false;
			post.save().then(function (data) {
				res.status(200).json({
					success: true,
					data: "removed successfully"
				});
			});
		} else {
			res.status(400).json({
				success: false,
				message: "post dose not exist.",
				error: error
			});
		}
	});
};

postController.createTag = function (req, res) {
	var nameArray = JSON.parse(req.body.tags);
	console.log(typeof nameArray === "undefined" ? "undefined" : _typeof(nameArray));
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
			message: "Could not save the tag, try after sometime",
			error: error
		});
	});
};
postController.getTags = function (req, res) {
	_tagModel2.default.find(function (error, post) {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	});
};

postController.createCategory = function (req, res) {
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
			message: "Could not save the tag, try after sometime",
			error: error
		});
	});
};
postController.getCategory = function (req, res) {
	_categoryModel2.default.find(function (error, post) {
		if (error == null) {
			res.status(200).json({
				success: true,
				data: post
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	});
};

postController.displayByTag = function (req, res) {
	var name = req.params.tag;
	var offset = parseInt(req.param("offset"));
	var limit = parseInt(req.param("limit"));
	console.log("albin");
	console.log(name, "tag name");

	_tagModel2.default.findOne({
		name: name
	}, function (error, tag) {
		console.log(tag, "incoming tag details");
		if (error == null && tag != null) {
			_postModel2.default.find({
				tags: tag._id
			}, "author tags category publishedDate mainImage heading subHeading slug", function (error, post) {
				if (error == null) {
					console.log(post, "incoming post details");
					res.status(200).json({
						success: true,
						data: post
					});
				} else {
					res.status(400).json({
						success: false,
						message: "Dose not exist.",
						error: error
					});
				}
			}).populate("author").populate("tags").populate("category").skip(offset).limit(limit);
		} else {
			console.log("no success");
			res.status(400).json({
				success: false,
				message: "Dose not exist.",
				error: error
			});
		}
	});
};
exports.default = postController;