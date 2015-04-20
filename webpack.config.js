var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/entry.js',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'jsx-loader?harmony'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader',
                                        'css-loader!less-loader')
    }]
  },
  output: {
    libraryTarget: 'umd',
    library: 'Flatris',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ]
};
