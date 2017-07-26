import express from "express";
import mongoose from "mongoose";

const db = mongoose.connection;

// NOTE - user import
import config from "./config/";
import router from './router.js'
import middleware from './middleware.js'
import errorHandler from './errorHandler.js'
import database from './database.js'

// NOTE - Main App
const app = express();

// NOTE - Middleware
middleware(app)

// NOTE - Use routes
router(app)

//NOTE - Error handler
errorHandler(app)

//NOTE - Database
database()

//NOTE - Server listen
const server = app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});

process.on("SIGINT", () => {
  console.log("shutting down!");
  db.close();
  server.close();
  process.exit();
});

module.exports = server
