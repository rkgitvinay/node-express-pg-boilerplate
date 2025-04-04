const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const SuccessResponse = require('../utils/ApiSuccess');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return SuccessResponse.created(res, user, 'User created successfully');
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.getUsers(filter, options);
  return SuccessResponse.ok(res, result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found', 'USER_NOT_FOUND');
  }
  return SuccessResponse.ok(res, user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);
  return SuccessResponse.ok(res, user, 'User updated successfully');
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  return SuccessResponse.ok(res, 'User deleted successfully');
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
