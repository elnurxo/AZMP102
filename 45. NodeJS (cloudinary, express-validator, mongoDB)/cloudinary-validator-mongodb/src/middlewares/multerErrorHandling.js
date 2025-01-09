const multer = require("multer")

function multerErrorHandling(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ error: err.message });
  } else if (err instanceof Error) {
    // Other errors (e.g., file type validation errors)
    return res.status(400).json({ error: err.message });
  }
  next();
}

module.exports = multerErrorHandling;