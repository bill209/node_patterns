var FS = require('fs');
var Q = require('q');


// -------------------------------------------------------------------------------------------------- //
//  ex 1: inline example
// -------------------------------------------------------------------------------------------------- //

	// promise-resolve-then-flow.js
var deferred = Q.defer();
deferred.promise.then(function (res) {
	console.log('\r\nexample 1: ');
	console.log(res);
});
deferred.resolve("hi world");

// -------------------------------------------------------------------------------------------------- //
//  ex 2: using declared functions for the defer
// -------------------------------------------------------------------------------------------------- //

readFile('data/test1.txt')
	.then(function(txt){
		console.log('\r\nexample 2: ');
		console.log('readFile:\r\n',txt);
	}).fail(function (error) {
		console.log('Something went wrong: ' + error.message);
	}).fin(function(){
		console.log('THE END\r\n');
	});

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

// -------------------------------------------------------------------------------------------------- //
//  ex 3: using assigned functions for the defer
//  note: the content of assigned functions are not hoisted,  so
//  declare them before they are needed.
// -------------------------------------------------------------------------------------------------- //

var readFile2 = function(fname){
	var deferred = Q.defer();
	FS.readFile(fname, 'utf8', function(error, text){
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}

readFile2('data/test2.txt')		// change the filename to cause it to fail; and it may  print out ABOVE the call that takes place above
	.then(function(txt){
		console.log('\r\nexample 3: ');
		console.log('readFile2:\r\n',txt);
	}).fail(function (error) {
		console.log('\r\nSomething went wrong: ' + error.message + '\r\n');
	}).fin(function(){
		console.log('THE END');
	});

// -------------------------------------------------------------------------------------------------- //
//  ex 4: using q's delay feature
// -------------------------------------------------------------------------------------------------- //

function holdOn() {
    return Q.delay(2000)
}

holdOn()
.then(function() {
	console.log('\r\nexample 4: ');
	console.log('sweet');
}).fail(function(){
	console.log('hard to think this can fail...')
});

// -------------------------------------------------------------------------------------------------- //
//  ex 5: using q's delay feature inline
// -------------------------------------------------------------------------------------------------- //

Q.delay(3000)
    .then(function() {
	console.log('\r\nexample 5: ');
        console.log('this was simple');
    });

// -------------------------------------------------------------------------------------------------- //
//  ex 3: inline example
// -------------------------------------------------------------------------------------------------- //

Q.delay('bob', 4000)
    .then(function(data) {
	console.log('\r\nexample 6: ');
        console.log('hi ' + data);
    });


