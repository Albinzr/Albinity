"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./config/");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var db = _mongoose2.default.connection;

module.exports = function () {

  // NOTE - Mongoose setup
  // NOTE -  warn if MONGOURI is being used and pass is undefined
  if (_config2.default.db === process.env.MONGOURI && !_config2.default.pass) console.log("bad credientials for " + _config2.default.db + " -- check env.");
  _mongoose2.default.connect(_config2.default.db, {
    user: _config2.default.user,
    pass: _config2.default.pass
  });

  db.on("error", function () {
    throw new Error("unable to connect to database at " + _config2.default.db);
  });
};