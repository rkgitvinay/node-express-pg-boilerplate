require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_DB_HOST || 'localhost',
      port: process.env.PG_DB_PORT || 5432,
      user: process.env.PG_DB_USER || 'your_pg_user',
      password: process.env.PG_DB_PASSWORD || 'your_pg_password',
      database: process.env.PG_DB_NAME || 'your_pg_db',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.PG_DB_HOST || 'localhost',
      port: process.env.PG_DB_PORT || 5432,
      user: process.env.PG_DB_USER || 'your_pg_user',
      password: process.env.PG_DB_PASSWORD || 'your_pg_password',
      database: process.env.PG_DB_NAME || 'your_pg_db',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_DB_HOST || 'localhost',
      port: process.env.PG_DB_PORT || 5432,
      user: process.env.PG_DB_USER || 'your_pg_user',
      password: process.env.PG_DB_PASSWORD || 'your_pg_password',
      database: process.env.PG_DB_NAME || 'your_pg_db',
    },
    pool: {
      min: 4,
      max: 20,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};
