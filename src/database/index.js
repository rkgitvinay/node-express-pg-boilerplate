const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../../knexfile');
const logger = require('../config/logger');

const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];

const knex = Knex({
  ...config,
  pool: {
    ...config.pool,
    afterCreate: (conn, done) => {
      logger.info(`✅ Database Connection created [${env}]`);
      done(null, conn);
    },
  },
});

// Optional: log queries in dev
if (env === 'development') {
  knex.on('query', (queryData) => {
    logger.info(`🛠 Executing SQL: ${queryData.sql}`);
  });
}

// Optional: track pool destroy
const originalDestroy = knex.destroy;
knex.destroy = async (...args) => {
  logger.info(`❌ Database Connection pool destroyed`);
  return originalDestroy.apply(knex, args);
};

// Bind to Objection
Model.knex(knex);

module.exports = knex;
