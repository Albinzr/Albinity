"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _serveFavicon = require("serve-favicon");

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _connectRedis = require("connect-redis");

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _config = require("./config/");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var client = _redis2.default.createClient();

var redisStore = (0, _connectRedis2.default)(_expressSession2.default);

module.exports = function (app) {
	var allowCrossDomain = function allowCrossDomain(req, res, next) {
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
		// res.header("application/json; charset=utf-8", "Content-Type")
		res.header("Access-Control-Allow-Credentials", true);

		next();
	};

	// NOTE - Set template engine
	app.set("view engine", "ejs");
	app.set("view", _path2.default.join(_config2.default.root, "views"));

	// NOTE - Use
	app.use(allowCrossDomain);
	app.use((0, _methodOverride2.default)());
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
		extended: false
	}));
	app.use((0, _cookieParser2.default)());
	app.use((0, _compression2.default)());
	app.use((0, _helmet2.default)());
	app.use((0, _morgan2.default)("dev"));
	app.use(_express2.default.static(_path2.default.join(_config2.default.root, "/uploads")));
	// app.use(favicon(path.join(config.root, "static/img/favicon.png")));
	//
	app.use((0, _expressSession2.default)({
		secret: "2tb78978tc786r3tn78789rwrb7r3t70 r3bt789n0cwtn89w0890xbt0r3qt78br3b78r378qr3b73Q",
		store: new redisStore({
			host: "localhost",
			port: 6379,
			client: client,
			disableTTL: true,
			logErrors: true
		}),
		saveUninitialized: false,
		resave: false
	}));
};