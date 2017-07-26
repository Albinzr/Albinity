import Post from "../model/postModel";
import textSearch from "mongoose-text-search";
var mongoose = require("mongoose");

const searchController = {};

searchController.fuzzySearch = (req, res) => {

  let offset = parseInt(req.param("offset"))
  let limit = parseInt(req.param("limit"))
  // const query = req.query.search;
  const query = req.param("key")
  const searchTag = {
    $text: {
      $search: query
    }
  };

  Post.find(searchTag, (error, searchResult) => {
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
  }).skip(offset).limit(limit);
};

export default searchController;
