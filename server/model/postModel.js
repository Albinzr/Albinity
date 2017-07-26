import validator from "validator"
import mongoose from "mongoose";
const {Schema} = mongoose;

mongoose.Promise = global.Promise;

import User from './userModel'

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

  publishedDate: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  },

  section: {
    type: Array,
    required: [true, "Enter section for post"],
    name: {
      type: String,
      required: [true, "Enter section for post"]
    }
  },

  tags: {
    type: Array,
    required: [true, "Enter section for post"],
    name: {
      type: String,
      required: [true, "Enter section for post"]
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    },
  }
})
postModel.index({
  "$**": "text"
});
const Post = mongoose.model("Post", postModel)
export default Post
