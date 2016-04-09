var fs = require('fs');
var dir = '.tmp';
var dir1 = '.tmp/stylesheets';
var dir2 = '.tmp/javascripts';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
if (!fs.existsSync(dir1)) {
  fs.mkdirSync(dir1);
}
if (!fs.existsSync(dir2)) {
  fs.mkdirSync(dir2);
}
// var mkdirp = require('mkdirp');

// mkdirp(dir, function(err) {
//   if (err) console.error(err);
//   else console.log('pow!');
// });
// mkdirp(dir1, function(err) {
//   if (err) console.error(err);
//   else console.log('pow!');
// });
// mkdirp(dir2, function(err) {
//   if (err) console.error(err);
//   else console.log('pow!');
// });