var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    library: 'Flatris',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader',
                                        'css-loader!less-loader')
    }]
  }
};
