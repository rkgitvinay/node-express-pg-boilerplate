class ApiError extends Error {
  constructor(statusCode, message, errorCode = 'UNKNOWN_ERROR', isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
