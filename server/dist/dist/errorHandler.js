"use strict";

var _config = require("./config/");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function (app) {

  // NOTE - catch 404 and forward to error handler
  app.use(function (req, res, next) {

    console.log("In 404");
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // NOTE - general errors
  app.use(function (err, req, res, next) {
    console.log("In general errors");
    var sc = err.status || 500;

    res.json({
      success: false,
      status: res.status(sc).stringify,
      message: err.message,
      stack: _config2.default.env === "development" ? err.stack : ""
    });
  });
};