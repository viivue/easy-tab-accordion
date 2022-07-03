const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../web'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Build demo web
  web: path.resolve(__dirname, '../build'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}
