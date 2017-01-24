/**
 * Created by Uncle Charlie, 2017/01/18
 */

import gulp from 'gulp'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'

const paramConfig = {
  source: 'server/**/*.js',
  serverDest: './build/server',
  clientDest: './build/client',
}

gulp.task('lint', () => {
  return gulp.src([paramConfig.source, '!node_modules/**', '!server/petshop-admin/**'])
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

gulp.task('default', ['lint', 'babel-sourcemaps'], () => {
  console.log('gulp default task!')
})
