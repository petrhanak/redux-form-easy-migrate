const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      "redux-form-legacy": path.resolve(__dirname, 'client', 'components', 'forms', 'reduxFormLegacy.js')
    }
  }
};