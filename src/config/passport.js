const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./index');
const { tokenTypes } = require('./tokens');
const User = require('../database/models/User'); // Objection.js model

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * Verifies JWT token payload and attaches the user to the request
 */
const jwtVerify = async (payload, done) => {
  try {
    // Ensure token is of access type
    if (payload.type !== tokenTypes.ACCESS) {
      return done(new Error('Invalid token type'), false);
    }

    // Fetch user using Objection
    const user = await User.query()
      .findById(payload.sub)
      .withGraphFetched('role')
      .modifyGraph('role', (builder) => {
        builder.select('id', 'name');
      });

    if (!user) {
      return done(null, false); // Unauthorized
    }

    return done(null, user); // Attach user to req.user
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
