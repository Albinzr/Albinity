"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _postModel = require("../model/postModel");

var _postModel2 = _interopRequireDefault(_postModel);

var _mongooseTextSearch = require("mongoose-text-search");

var _mongooseTextSearch2 = _interopRequireDefault(_mongooseTextSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");

var searchController = {};

searchController.fuzzySearch = function (req, res) {
	var offset = parseInt(req.param("offset"));
	var limit = parseInt(req.param("limit"));

	var query = req.params.key;
	console.log(offset, limit, typeof query === "undefined" ? "undefined" : _typeof(query));
	var searchTag = {
		$text: {
			$search: query
		}
	};

	_postModel2.default.find(searchTag, "author tags category publishedDate mainImage heading subHeading slug", function (error, searchResult) {
		if (error != null) {
			return res.json({
				success: false,
				message: "Failed to register",
				error: error
			});
		} else {
			res.json({
				success: true,
				data: searchResult
			});
		}
	}).populate("author").populate("tags").populate("category").skip(offset).limit(limit);
};

exports.default = searchController;