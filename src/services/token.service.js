const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const Token = require('../database/models/Token');
const { tokenTypes } = require('../config/tokens');
const config = require('../config');
const ApiError = require('../utils/ApiError');

/**
 * Generate a unique JWT token
 * JWT ID (jti) is a unique identifier for the token
 * Prevents collisions even if two tokens are created in the same second
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    jti: uuidv4(),
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save token in DB
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  return await Token.query().insert({
    token,
    user_id: userId,
    expires_at: expires.toDate(),
    type,
    blacklisted,
  });
};

/**
 * Verify token and return token document
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);

  const tokenDoc = await Token.query().findOne({
    token,
    type,
    user_id: payload.sub,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new ApiError(
      httpStatus.status.NOT_FOUND,
      'Token not found or blacklisted',
      'INVALID_AUTH_TOKEN'
    );
  }

  return tokenDoc;
};

/**
 * Generate auth access and refresh tokens
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  await saveToken(accessToken, user.id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
