const httpStatus = require('http-status');
const { getOffset } = require('../utils/utils');
const ApiError = require('../utils/ApiError');
const User = require('../database/models/User');
const Role = require('../database/models/Role');

const getUserByEmail = async (email) => {
  return await User.query()
    .findOne({ email })
    .withGraphFetched('role')
    .modifyGraph('role', (builder) => {
      builder.select('id', 'name');
    });
};

const getUserById = async (id) => {
  return await User.query()
    .findById(id)
    .withGraphFetched('role')
    .modifyGraph('role', (builder) => {
      builder.select('id', 'name');
    });
};

const createUser = async (body) => {
  const { email, name, password, role: roleId } = body;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new ApiError(
      httpStatus.status.CONFLICT,
      'This email already exists',
      'EMAIL_ALREADY_EXIST'
    );
  }

  const role = await Role.query().findById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Role not found');
  }
  const createdUser = await User.query().insert({
    name,
    email,
    password,
    role_id: roleId,
  });

  return createdUser;
};

const getUsers = async (filter, options) => {
  const { page, limit } = options;
  const offset = getOffset(page, limit);
  const users = await User.query()
    .withGraphFetched('role')
    .modifyGraph('role', (builder) => {
      builder.select('id', 'name');
    })
    .select('id', 'name', 'email', 'created_at', 'updated_at')
    .orderBy([
      { column: 'name', order: 'asc' },
      { column: 'created_at', order: 'desc' },
      { column: 'updated_at', order: 'desc' },
    ])
    .offset(offset)
    .limit(limit);

  const totalResult = await User.query().resultSize();

  return {
    users,
    meta: {
      total: totalResult,
      page,
    },
  };
};

const deleteUserById = async (userId) => {
  const deletedRows = await User.query().deleteById(userId);

  if (!deletedRows) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found', 'USER_NOT_FOUND');
  }

  return deletedRows;
};

const updateUser = async (userId, body) => {
  const { password, email, name } = body;

  const updateBody = { name };
  if (password) {
    updateBody.password = password;
  }

  if (email) {
    const existing = await getUserByEmail(email);
    if (existing && existing.id !== Number(userId)) {
      throw new ApiError(
        httpStatus.status.CONFLICT,
        'This email already exists',
        'EMAIL_ALREADY_EXIST'
      );
    }
  }

  const updatedUser = await User.query().patchAndFetchById(userId, updateBody);
  if (!updatedUser) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found', 'USER_NOT_FOUND');
  }

  return updatedUser;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  getUsers,
  deleteUserById,
};
