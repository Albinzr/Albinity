"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var tagModel = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, "Enter the tag"],
		minlength: [2, "Tag should be minimum 3 letter long."]
	}
});
tagModel.index({
	"$**": "text"
});
var Tag = _mongoose2.default.model("Tag", tagModel);
exports.default = Tag;