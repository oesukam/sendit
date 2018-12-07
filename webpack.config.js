const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  plugins: [
    new CopyWebpackPlugin([
      { from: 'ui/src/images', to: 'ui/dist/images' },
      { from: 'ui/src/css', to: 'ui/dist/css' },
      { from: 'ui/src/images', to: 'ui/dist/images' },
      { from: 'ui/src/fonts', to: 'ui/dist/fonts' },
      { from: 'ui/src/favicon.ico', to: 'ui/dist/favicon.ico' },
    ]),
  ],
  devtool: '#eval-source-map',
  target: 'web',
};
