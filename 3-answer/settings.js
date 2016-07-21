'use strict';

module.exports = (() => {
  var path = require('path');

  return {
    basePath: path.resolve(process.cwd()),
    srcPath: './src/',
    distPath: './dist/',
    webpackConfigPath: './webpack.config.js',
    webpackLoadersPath: './webpack/loaders/'
  };
})();
