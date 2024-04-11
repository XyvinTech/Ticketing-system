const createError = require("http-errors");
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  if (err instanceof createError.InternalServerError) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  } else {
    res.status(err.status || 500).json({ status: false, error: err.message });
  }
};

module.exports = errorHandler;
