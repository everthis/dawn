'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var _ = require('lodash');

var fs = require('fs');

var projectRootPath = path.resolve(__dirname, '../../');

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return buildStyles();
});

function loopPackageJson() {
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));
  var packagesArr = [];
  var packageJsonDepKeysArr = Object.keys(packageJson.dependencies);
  var modulePackageJson;
  for (var i = 0; i < packageJsonDepKeysArr.length; i++) {
    modulePackageJson = JSON.parse(fs.readFileSync( conf.paths.node_modules + '/' + packageJsonDepKeysArr[i] + '/package.json'));
    if(modulePackageJson.main){
      packagesArr.push(projectRootPath + '/' + conf.paths.node_modules + '/' + packageJsonDepKeysArr[i] + '/' + modulePackageJson.main);
    }else{
      packagesArr.push(projectRootPath + '/' + conf.paths.node_modules + '/' + packageJsonDepKeysArr[i] + '/' + modulePackageJson.files[0]);
    }
  };
  return packagesArr;
}


var buildStyles = function() {
  var modules = loopPackageJson();
  var sassOptions = {
    style: 'expanded',
    includePaths: [path.join(projectRootPath, 'node_modules')]
  };

  var injectNPMDepFiles = gulp.src(modules, {read: true});

  var injectNPMDepOptions = {
    transform: function(filePath, file) {
      return file.contents.toString('utf8');
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/stylesheets/application.scss')
  ])
    .pipe($.inject(injectNPMDepFiles, injectNPMDepOptions))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
