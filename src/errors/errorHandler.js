// Added to catch basic errors

function errorHandler(error, req, res, next) {
  const { status = 500, message = "An error occurred" } = error;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
