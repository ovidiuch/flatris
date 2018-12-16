const { join, resolve } = require('path');

module.exports = {
  webpack(config, { dev, isServer }) {
    // Transpile shared code as well
    config.module.rules
      .filter(rule => rule.use && rule.use.loader === 'next-babel-loader')
      .forEach(rule => {
        rule.include.push(join(__dirname, '../shared'));
        rule.use.options.configFile = resolve('./babel.config.js');
      });

    // Enable source maps in production
    if (!dev) {
      config.devtool = 'source-map';

      if (!isServer) {
        config.plugins.map(p => {
          if (p.constructor.name === 'UglifyJsPlugin') {
            p.options.sourceMap = true;
          }

          return p;
        });
      }
    }

    // XXX: Uncomment to generate unminified production code
    // config.plugins = config.plugins.filter(
    //   plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    // );

    return config;
  }
};
