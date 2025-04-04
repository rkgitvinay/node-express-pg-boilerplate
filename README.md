# RESTful Node Server Boilerplate

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Postgres.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/rkgitvinay/node-express-pg-boilerplate.git <folder-name>
cd <folder-name>
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **SQL database**: [Postgres](https://www.postgresql.org/) object data modeling using [Knexjs](https://knexjs.org) and [Objection.js](https://vincit.github.io/objection.js/)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)

- **Docker support**

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test
```

## Migration & seed commands:

```bash
# Run all migrations
npm run migrate

# Roll back last migration
npm run migrate:rollback

# Create a new migration
npm run migrate:make migration_name

# Run seed files
npm run seed

# Create a new seed file
npm run seed:make seed_name
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# Database - PostgreSQL
PG_DB_HOST=localhost
PG_DB_PORT=5432
PG_DB_USER=postgres
PG_DB_PASSWORD=postgres
PG_DB_NAME=node-boilerplate
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--database\       # Database models, migrations, seed
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--index.js        # App entry point
 |--app.js          # Express app
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.


## Reference

[https://github.com/hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
