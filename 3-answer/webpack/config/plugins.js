'use strict';

module.exports = (function() {
  var
    path = require('path'),
    settings = require('../../settings'),
    webpack = require('webpack');

  return [
    new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({}),
    new webpack.WatchIgnorePlugin([
      path.resolve(settings.srcPath + '/data/')
    ])
  ];
})();
