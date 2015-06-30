var FS = require('fs');
var Q = require('q');
var REQ = require('request');


// -------------------------------------------------------------------------------------------------- //
//  ex 1: recursive function using declared functions for the
// defer as well as declared functions within each .then
// -------------------------------------------------------------------------------------------------- //

files = ['data/test1.txt', 'data/test2.txt'];//, 'data/test3.txt', 'data/test4.txt'];

//console.log ('\r\n----- begin recursive iteration -----\r\n')
var recursiveReadFiles = function(i){
	var deferred = Q.defer();
	console.log('i. ',i);
	var cur = i++;
	if(i<files.length){
		recursiveReadFiles(i)
		.then(function(txt){
			deferred.resolve('inner: ' + i);
		})
		return deferred.promise;
	}

	console.log('cur',cur);
	readFile(files[cur])
		.then(function(txt){
			deferred.resolve('txt: '+txt);
		}).fail(function(e){ console.log('error reading: ' + files[i],e) });

	return deferred.promise;
}


recursiveReadFiles(0)
	.then(function(txt){
		console.log('txt:::',txt);
	});



function readFile(fname){
	var deferred = Q.defer();
	console.log('fname',fname);

	FS.readFile(fname, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve('readfile: ' + text);
		}
	});
	return deferred.promise;
}

