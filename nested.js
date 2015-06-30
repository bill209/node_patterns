var FS = require('fs');
var Q = require('q');
var REQ = require('request');


// -------------------------------------------------------------------------------------------------- //
//  ex 1: recursive function using declared functions for the
// defer as well as declared functions within each .then
// -------------------------------------------------------------------------------------------------- //

var files = ['data/test1.txt', 'data/test2.txt'];//, 'data/test3.txt', 'data/test4.txt'];

recursiveReadFiles(0)
	.then(function(txt){
		console.log('txt:::',txt);
	});

//console.log ('\r\n----- begin recursive iteration -----\r\n')
function recursiveReadFiles(i){
	var deferred = Q.defer();

	readFile(files[i])
		.then(function(txt){
//			console.log(files[i] + ': ' + txt);
			if(++i<files.length){
				recursiveReadFiles(i)
				.then(function(txt){
					console.log('txt',txt);
				})
			} else {
//				flatReadFiles();
			}
				deferred.resolve('d.r.  ' + i);
				return deferred.promise;
		}).fail(function(e){ console.log('error reading: ' + files[i],e) });
	return deferred.promise;
}

// -------------------------------------------------------------------------------------------------- //
//  ex 2: non-recursive function using declared functions for the
// defer as well as declared functions within each .then
// -------------------------------------------------------------------------------------------------- //

function flatReadFiles(){
	console.log ('\r\n----- begin flat iteration -----\r\n')
	readFile(files[0])
		.then(function(txt){
			console.log(files[0] + ': ' + txt);
			readFile(files[1])
			.then(function(txt){
				console.log(files[1] + ': ' + txt);
				readFile(files[2])
				.then(function(txt){
					console.log(files[3] + ': ' + txt);

				}).fail(function(e){ console.log('error reading test3.txt: ',e) });

			}).fail(function(e){ console.log('error reading test2.txt: ',e) });

		}).fail(function(e){ console.log('error reading test3.txt: ',e) });
}

function readFile(fname){
	var deferred = Q.defer();

	FS.readFile(fname, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}
