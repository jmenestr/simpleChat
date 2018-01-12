const path = require('path');

module.exports = {
  entry: './dist/client-app/index.js',
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
