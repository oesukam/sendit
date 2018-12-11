const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  performance: { hints: false },
  mode: 'production',
  entry: './ui/src/app.js',
  output: {
    filename: 'app.js',
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
  plugins: [
    new CopyWebpackPlugin([
      { from: 'ui/src/index.html', to: 'index.html' },
      { from: 'ui/src/libraries', to: 'libraries' },
      { from: 'ui/src/images', to: 'images' },
      { from: 'ui/src/css', to: 'css' },
      { from: 'ui/src/images', to: 'images' },
      { from: 'ui/src/fonts', to: 'fonts' },
      { from: 'ui/src/favicon.ico', to: 'favicon.ico' },
    ]),
  ],
  devtool: '#eval-source-map',
  target: 'web',
};
