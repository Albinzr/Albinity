"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var uploadController = {};

uploadController.uploadBlogImages = function (req, res) {
	var baseURL = req.protocol + "://" + req.get("host") + "/";
	res.status(200).json({
		url: baseURL + req.file.path
	});
};

exports.default = uploadController;