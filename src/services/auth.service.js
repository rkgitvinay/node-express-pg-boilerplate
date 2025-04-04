const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Login with username and password
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      'Incorrect email or password',
      'INVALID_CREDENTIALS'
    );
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
