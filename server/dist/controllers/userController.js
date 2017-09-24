"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _userModel = require("../model/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {};

//NOTE - Register -

userController.register = function (req, res) {
	var _req$body = req.body,
	    username = _req$body.username,
	    password = _req$body.password,
	    email = _req$body.email,
	    phno = _req$body.phno;

	// NOTE Validation if necessory

	var user = new _userModel2.default({
		username: username,
		password: password,
		email: email,
		phno: phno
	});

	user.save().then(function (newUser) {
		res.json({
			success: true,
			data: newUser
		});
	}).catch(function (error) {
		if (error.code == 11000) {
			return res.status(403).json({
				success: false,
				message: "Email already exists",
				error: error
			});
		} else {
			return res.status(403).json({
				success: false,
				message: "Failed to register",
				error: error
			});
		}
	});
};

//NOTE - Login -

userController.login = function (req, res) {
	var _req$body2 = req.body,
	    username = _req$body2.username,
	    password = _req$body2.password;


	console.log(username, password, "...........");

	_userModel2.default.findOne({
		username: username
	}, function (error, user) {
		console.log(error, user);
		if (user != null && user.password == password) {
			req.session.username = req.body.username;
			req.session.userId = user._id;
			req.session.email = user.email;

			return res.json({
				success: true,
				data: "logged in successfully"
			});
		} else {
			return res.status(403).json({
				success: false,
				message: "User dose not exist",
				error: error
			});
		}
	}).select("+password");
};

//NOTE - logout -

userController.logout = function (req, res) {
	// return request.session.destroy();
	req.session.destroy(function (error) {
		if (error) {
			return res.status(403).json({
				success: false,
				message: "User dose not exist",
				error: error
			});
		} else {
			return res.json({
				success: true,
				data: "logged out successfully"
			});
		}
	});
};

exports.default = userController;