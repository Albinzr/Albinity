import express from "express";
import path from "path";
import compress from "compression";
import favicon from "serve-favicon";
import helmet from "helmet";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import session from "express-session";
import redis from "redis";
const client = redis.createClient();
import redisStoreForSession from "connect-redis";
const redisStore = redisStoreForSession(session);

import config from "./config/";

module.exports = function(app) {

  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  };

  // NOTE - Set template engine
  app.set("view engine", "ejs");
  app.set("view", path.join(config.root, "views"));

  // NOTE - Use
  app.use(allowCrossDomain);
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(helmet());
  app.use(logger("dev"));
  app.use(express.static(path.join(config.root, "/uploads")));
  // app.use(favicon(path.join(config.root, "static/img/favicon.png")));
  //
  app.use(
    session({
      secret: "2tb678978tc786r3tn78789rwrb7r3t70 r3bt789n0cwtn89w0890xbt0r3qt78br3b78r378qr3b73Q",
      store: new redisStore({
        host: "localhost",
        port: 6379,
        client: client,
        disableTTL: true,
        logErrors: true
      }),
      saveUninitialized: false,
      resave: false
    })
  );
}
