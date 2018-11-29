const path = require('path');
module.exports = {
  entry: "./ui/src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'ui/dist')
  }
}