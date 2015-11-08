var path = require('path'),
    webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    libraryTarget: 'umd',
    library: 'Flatris',
    filename: 'bundle.js',
    publicPath: '/build/',
    path: path.join(__dirname, 'build')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }]
  }
};
