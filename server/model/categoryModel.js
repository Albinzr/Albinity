import validator from "validator"
import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

const categoryModel = new Schema({
	name: {
		type: String,
		required: [true, "Enter the tag"],
		minlength: [2, "Tag should be minimum 3 letter long."]
	}
})
categoryModel.index({
	"$**": "text"
})
const Category = mongoose.model("Category", categoryModel)
export default Category
