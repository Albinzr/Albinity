import config from "./config/";

module.exports = function(app) {

  // NOTE - catch 404 and forward to error handler
  app.use((req, res, next) => {

    console.log("In 404")
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // NOTE - general errors
  app.use((err, req, res, next) => {
    console.log("In general errors");
    const sc = err.status || 500;

    res.json({
      success: false,
      status: res.status(sc).stringify,
      message: err.message,
      stack: config.env === "development" ? err.stack : ""
    });
  });

}
