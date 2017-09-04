import Post from "../model/postModel"
import textSearch from "mongoose-text-search"
var mongoose = require("mongoose")

const searchController = {}

searchController.fuzzySearch = (req, res) => {
	let offset = parseInt(req.param("offset"))
	let limit = parseInt(req.param("limit"))

	const query = req.params.key
	console.log(offset, limit, typeof query)
	const searchTag = {
		$text: {
			$search: query
		}
	}

	Post.find(
		searchTag,
		"author tags category publishedDate mainImage heading subHeading slug",
		(error, searchResult) => {
			if (error != null) {
				return res.json({
					success: false,
					message: "Failed to register",
					error: error
				})
			} else {
				res.json({
					success: true,
					data: searchResult
				})
			}
		}
	)
		.populate("author")
		.populate("tags")
		.populate("category")
		.skip(offset)
		.limit(limit)
}

export default searchController
