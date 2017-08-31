import validator from "validator"
import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

import User from "./userModel"
import Category from "./categoryModel"
import Tag from "./tagModel"

const postModel = new Schema({
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

	category: [
		{
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "no tags"]
		}
	],

	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tag",
			required: [true, "no tags selected"]
		}
	],

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
})
postModel.index({
	"$**": "text"
})
const Post = mongoose.model("Post", postModel)
export default Post
