const path = require('path');

module.exports = {
  mode: 'production',
  entry: './ui/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'ui/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  devtool: '#eval-source-map',
  target: 'web',
};
