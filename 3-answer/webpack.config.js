'use strict';

module.exports = (function() {
  var path = require('path');
  var webpack = require('webpack');
  var settings = require('./settings');

  return {
    entry: path.resolve(__dirname, settings.srcPath.concat('main.js')),
    output: {
      path: path.resolve(__dirname, settings.distPath),
      publicPath: path.resolve(__dirname, settings.distPath),
      filename: '[name].js',
      sourceMapFilename: '[file].map'
    },
    module: {
      noParse: [
        /node_modules\/\.js/
      ],
      preLoaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }],
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'replace-loader'
      }]
    },
    resolveLoader: {
      alias: {
        'replace-loader': path.resolve(__dirname, settings.webpackLoadersPath.concat('replace'))
      }
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        path.resolve(__dirname, settings.srcPath.concat('lib'))
      ]
    },
    eslint: {
      configFile: '.eslintrc.js',
      ignorePath: '.eslintignore'
    },
    plugins: [
      new webpack.optimize.DedupePlugin()
    ]
  };
})();
