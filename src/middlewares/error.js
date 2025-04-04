const httpStatus = require('http-status');
const config = require('../config/index');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.status.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    const errorCode = error.errorCode || 'UNKNOWN_ERROR';

    error = new ApiError(statusCode, message, errorCode, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const { errorCode } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.status.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: false,
    message,
    errorCode,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
