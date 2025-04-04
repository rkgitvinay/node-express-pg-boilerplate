const app = require('./app');
const config = require('./config/index');
const logger = require('./config/logger');

const server = app.listen(config.port, () => {
  logger.info(`✅ app is running on port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('app closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

module.exports = server;
