const cosmosConfig = require('./cosmos.config');

module.exports = {
  ...cosmosConfig,
  next: true,
  port: 8990
};
