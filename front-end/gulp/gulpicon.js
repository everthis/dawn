// var gulpicon = require("./tasks/gulpicon");

// // grab the config, tack on the output destination
// var config = require("./example/config.js");
// config.dest = "example/output";

// // grab the file paths
// var files = glob.sync("example/svg/*.svg");

// // set up the gulp task
// gulp.task("icons", gulpicon(files, config));


var gulp      = require('gulp'),
    q         = require('q'),
    path      = require('path'),
    fs        = require('fs'),
    Grunticon = require('grunticon-lib');

gulp.task('icons', function () {
  var deferred = q.defer(),
      iconDir = 'app/images/icons/',
      options = { enhanceSVG: true };

  var files = fs.readdirSync(iconDir).map(function (fileName) {
    return path.join(iconDir, fileName);
  });

  var grunticon = new Grunticon(files, 'dist/icons', options);

  grunticon.process(function () {
    deferred.resolve();
  });

  return deferred.promise;
});