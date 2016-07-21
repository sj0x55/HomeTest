'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var settings = require('./settings');
var karmaServer = require('karma').Server;

gulp.task('default', ['webpack']);

gulp.task('copy', function(cb) {
  gulp.src(settings.srcPath.concat('data/customers.json')).pipe(gulp.dest(settings.distPath.concat('data')));
  gulp.src(settings.srcPath.concat('other/index.html')).pipe(gulp.dest(settings.distPath.concat('other')));
  cb();
});

gulp.task('webpack', ['copy'], function(cb) {
  webpack(require(settings.webpackConfigPath)).run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({}));
    cb();
  });
});

gulp.task('webpack-dev-server', ['copy'], function() {
  var compiler = webpack(require(settings.webpackConfigPath));

  new WebpackDevServer(compiler, {
    historyApiFallback: {
      index: 'dist/index.html'
    },
    publicPath: path.resolve(__dirname, settings.distPath)
  }).listen(1234, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:1234/webpack-dev-server/');
  });
});

gulp.task('test', function(done) {
  var karmaInstance = new karmaServer({
    configFile: path.resolve(__dirname + '/karma.config.js'),
    singleRun: true
  },
  function () {
    done();
  });

  karmaInstance.start();
});
