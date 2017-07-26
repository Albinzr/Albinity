import express from "express";
import path from "path";

import userController from "./controllers/userController";
import searchController from "./controllers/searchController";
import postController from "./controllers/postController";

// NOTE - Image processing imports
import multer from "multer";
import crypto from "crypto";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.session);
    require("fs").mkdir("uploads/" + req.session.username + "/", err => {
      cb(null, "./uploads/" + req.session.username + "/");
    });
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err);
      const newPath = raw.toString("hex") + path.extname(file.originalname);
      cb(null, newPath);
    });
  }
});

var upload = multer({
  storage: storage
});

module.exports = function(app) {

  //NOTE - Auth -
  app.post("/api/login", userController.login);
  app.get("/api/logout", userController.logout);
  app.post("/api/register", userController.register);

  //NOTE - Create -
  app.use("/uploads", express.static(__dirname + "/uploads"));
  app.post("/api/newpost", postController.createPost)
  app.get("/api/post/:slug", postController.detailedPost)
  app.get("/api/posts", postController.display)
  app.post("/api/update", postController.update)

  app.get("/test/:id", (req, res) => {

    return res.json({
      msg: req.params.id
    })

  })

  //NOTE - Search -
  app.get("/api/search/", searchController.fuzzySearch);

}
