module.exports = {
  webpack(cfg) {
    // XXX: Uncomment to generate unminified production code
    // cfg.plugins = cfg.plugins.filter(
    //   plugin => plugin.constructor.name !== 'UglifyJsPlugin'
    // );

    return cfg;
  }
};
