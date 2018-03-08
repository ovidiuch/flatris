module.exports = {
  webpack(config, { dev, isServer }) {
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
