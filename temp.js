var Q = require('q');
var FS = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

MKDIR = __dirname+'/a/b/c/';

console.log('__dirname',__dirname);
console.log('MKDIR',MKDIR);

mkdirp(MKDIR, function(e){
	console.log('e',e);
});
