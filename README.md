# 🚀 RESTful Node.js Express + PostgreSQL API Boilerplate

A modern boilerplate/starter project to kickstart your backend APIs using **Node.js**, **Express.js**, **PostgreSQL**, **Objection.js**, and **Knex.js**.  
Built for scalability, security, and productivity. Ideal for RESTful API development with JWT Auth, Swagger Docs, Docker, and a clean project structure.

![Stars](https://img.shields.io/github/stars/rkgitvinay/node-express-pg-boilerplate?style=social)
![Forks](https://img.shields.io/github/forks/rkgitvinay/node-express-pg-boilerplate?style=social)
![License](https://img.shields.io/github/license/rkgitvinay/node-express-pg-boilerplate)
![Issues](https://img.shields.io/github/issues/rkgitvinay/node-express-pg-boilerplate)


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

- 🛠 **Node + Express** setup
- 🗃️ **PostgreSQL** with **Knex.js** & **Objection.js**
- 🔐 **JWT-based Authentication** (with Passport.js)
- ✅ **Request Validation** using Joi
- 📊 **Swagger API Docs** at `/v1/docs`
- 🧪 **Jest** for Unit & Integration Testing
- 🛡️ Helmet, CORS, Input Sanitization for **Security**
- 🐳 **Docker support** for seamless deployment
- 📂 Modular and scalable **Project Structure**
- 📦 Environment management with `.env`

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
