var FS = require('fs');
var Q = require('q');
var REQ = require('request');


// -------------------------------------------------------------------------------------------------- //
//  ex 1: using declared functions for the defer as well as declared
//  functions within each .then
// -------------------------------------------------------------------------------------------------- //

files = ['data/test1.txt', 'data/test2.txt', 'data/test3.txt', 'data/test4.txt'];


readFile(files[0])
	.then(function(txt){
		console.log('\r\ntest1.txt: ');
		console.log(txt);
		readFile(files[1])

		.then(function(txt){
			console.log('test2.txt: ');
			console.log(txt);
			readFile(files[2])

			.then(function(txt){
				console.log('test3.txt: ');
				console.log(txt)

			}).fail(function(e){ console.log('error reading test3.txt: ',e) });

		}).fail(function(e){ console.log('error reading test2.txt: ',e) });

	}).fail(function(e){ console.log('error reading test3.txt: ',e) });



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
