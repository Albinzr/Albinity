"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require("./userModel");

var _userModel2 = _interopRequireDefault(_userModel);

var _categoryModel = require("./categoryModel");

var _categoryModel2 = _interopRequireDefault(_categoryModel);

var _tagModel = require("./tagModel");

var _tagModel2 = _interopRequireDefault(_tagModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var postModel = new Schema({
	heading: {
		type: String,
		required: [true, "Enter heading for post"],
		minlength: [3, "Post heading should be minimum 3 letter long."]
	},

	subHeading: {
		type: String,
		required: [true, "Enter sub heading for post"],
		minlength: [3, "Post sub heading should be minimum 3 letter long."]
	},

	context: {
		type: String,
		required: [true, "Enter story for post"]
	},
	mainImage: {
		type: String,
		required: [true, "You should have min one Image"]
	},
	publishedDate: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Date,
		default: Date.now
	},

	category: [{
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: [true, "no tags"]
	}],

	tags: [{
		type: Schema.Types.ObjectId,
		ref: "Tag",
		required: [true, "no tags selected"]
	}],

	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Your not logged in"]
	},
	active: {
		type: Boolean
	},
	slug: {
		type: String,
		required: [true, "Cannot create slug,Please create propre title"],
		index: {
			unique: true,
			sparse: true
		}
	}
});
postModel.index({
	"$**": "text"
});
var Post = _mongoose2.default.model("Post", postModel);
exports.default = Post;