var path = require('path');

module.exports.webpack = function(config) {
  config.resolve.alias.components = path.join(process.cwd(), 'src/components');
  return config;
};
