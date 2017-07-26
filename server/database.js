import mongoose from "mongoose";
import config from "./config/";

const db = mongoose.connection;

module.exports = function() {

  // NOTE - Mongoose setup
  // NOTE -  warn if MONGOURI is being used and pass is undefined
  if (config.db === process.env.MONGOURI && !config.pass)
    console.log(`bad credientials for ${config.db} -- check env.`);
  mongoose.connect(config.db, {
    user: config.user,
    pass: config.pass
  });

  db.on("error", () => {
    throw new Error(`unable to connect to database at ${config.db}`);
  });

}
