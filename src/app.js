const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/v1/index');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { jwtStrategy } = require('./config/passport');
require('./database/index');
// Initialize knex + objection
const app = express();

// set security HTTP headers
app.use(helmet());

// gzip compression
app.use(compression());

app.use(cors());
app.use(bodyParser.json({ limit: '500kb' }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/health', require('./routes/health.route'));

app.use('/api/v1', routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
