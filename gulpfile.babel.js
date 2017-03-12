/**
 * Created by Uncle Charlie, 2017/01/18
 */

import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import gutil from "gulp-util";
import sourcemaps from 'gulp-sourcemaps'
import gulpWebpack from 'webpack-stream'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const paramConfig = {
  source: 'server/**/*.js',
  clientSource: 'client/H5/index.js',
  serverDest: './built/server',
  clientDest: './built/client/assets',
}

gulp.task('lint', () => {
  return gulp.src([paramConfig.source, '!node_modules/**', '!server/petshop-admin/**', '!server/node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.result(result => {
      console.log(`ESLint result: ${result.filePath}`);
      console.log(`# Messages: `, result.messages);
      console.log(`# Warnings: ${result.warningCount}`);
      console.log(`# Errors: ${result.errorCount}`);
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task('babel', () => {
  return gulp.src(paramConfig.source)
    .pipe(babel())
    .pipe(gulp.dest(paramConfig.serverDest))
})

gulp.task('babel-sourcemaps', () => {
  return gulp.src(paramConfig.source)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paramConfig.serverDest))
})

gulp.task('webpack:build', (callback) => {
  let config = Object.create(webpackConfig)
  // return gulp.src(paramConfig.clientSource)
  //   .pipe(gulpWebpack({}, webpack))
  //   .pipe(gulpWebpack(require('./webpack.config.js')))
  //   .pipe(gulp.dest(paramConfig.clientDest))
  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err)
    gutil.log('[webpack:util]', stats.toString({
      colors: true
    }))
    if (callback)
      callback()
  })
})

gulp.task('default', [/*'lint', */'babel-sourcemaps', 'webpack:build'], () => {
  console.log('#####gulp default task!')
})
