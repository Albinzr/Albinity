import validator from "validator"
import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

const tagModel = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Enter the tag"],
		minlength: [2, "Tag should be minimum 3 letter long."]
	}
})
tagModel.index({
	"$**": "text"
})
const Tag = mongoose.model("Tag", tagModel)
export default Tag
