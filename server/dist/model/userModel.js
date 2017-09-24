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

var userModel = new Schema({
	username: {
		type: String,
		required: [true, "Username must not be empty."],
		minlength: [3, "Username must be 3 characters or more."]
	},

	password: {
		type: String,
		required: [true, "Password must not be empty."],
		minlength: [8, "Password must be 8 characters or more."],
		select: false
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	email: {
		type: String,
		required: [true, "Email must not be empty."],
		index: {
			unique: true,
			sparse: true
		},
		validate: {
			validator: _validator2.default.isEmail,
			message: "Email is not valid"
		}
	},

	phno: {
		type: [Number, "Phone number must digit."],
		required: [true, "Phone number must not be empty."],
		min: [10, "Phone number should be of 10 digit."],
		max: [11, "Phone number should be of 10 digit."]
	},

	created: {
		type: Date,
		default: Date.now
	},

	updated: {
		type: Date,
		default: Date.now
	}
});

var User = _mongoose2.default.model("User", userModel);
exports.default = User;