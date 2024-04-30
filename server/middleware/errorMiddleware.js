// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  // Determine status code based on existing response status code or default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Set default error message to the error message received
  let message = err.message;
  
  // Check if error is a CastError and if so, set status code to 404 and update message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  
  // Set response status code
  res.status(statusCode);
  
  // Send JSON response with error message and stack trace (in development environment)
  res.json({
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

// Middleware function to handle 404 Not Found errors
const notFound = (req, res, next) => {
  // Create new error object with message indicating resource not found
  const error = new Error(`Not Found: ${req.originalUrl}`);
  
  // Set response status code to 404
  res.status(404);
  
  // Pass error to the next middleware function
  next(error);
};

// Export errorHandler and notFound middleware functions
export { errorHandler, notFound };
