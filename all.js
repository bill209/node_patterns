var Q = require('q');
var REQ = require('request');

bbcPlaylistUrl = "http://www.bbc.co.uk/radio1/playlist.json";
googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:{{isbn}}"

// -------------------------------------------------------------------------------------------------- //
//  ex 1:  q.all - all defers handled as one, looping through results
// -------------------------------------------------------------------------------------------------- //

var getBookByIsbn = function (isbn) {
		 var deferred = Q.defer();
		 var u = googleBooksUrl.replace('{{isbn}}',isbn);
		 REQ({url:u}, function(err, res, content){
			if (!err && res.statusCode == 200) {
				var result  = JSON.parse(content);
				deferred.resolve(result);
			} else if(res.statusCode != 200){
				deferred.reject('server status: ' + res.statusCode);
			} else {
				deferred.reject('error: ' + err);
			}
		 })
		 return deferred.promise;
};

promisesArr = [getBookByIsbn('9780007141937'),getBookByIsbn('0307387895'),getBookByIsbn('0062225677')];

var bunchOPromises = Q.all(promisesArr);
bunchOPromises.then(function (results) {
	console.log('\r\n-----  example 1  -----')
for (var i = 0; i < results.length; i++) {
	console.log(i + '. ',results[i].items[0].volumeInfo.title + ' by ' + results[i].items[0].volumeInfo.authors[0]);
};
//	console.log(results.items[0].volumeInfo.title);
}).fail(function(e){
	console.log('error: ',e)
});

// -------------------------------------------------------------------------------------------------- //
//  ex 2:
// -------------------------------------------------------------------------------------------------- //

var getPlaylist = function (num) {
		 var deferred = Q.defer();
		 REQ({url:bbcPlaylistUrl}, function(err, res, content){
			if (!err && res.statusCode == 200) {
				var result  = JSON.parse(content);
				deferred.resolve(result.playlist.hottestrecord2013[num].title);
			} else if(res.statusCode != 200){
				deferred.reject('server status: ' + res.statusCode);
			} else {
				deferred.reject('bummer: ' + err);
			}
		 })
		 return deferred.promise;
};

promises = [getPlaylist(0), getPlaylist(1), getPlaylist(2)]

Q.all(promises)
	.then(function(result) {
		console.log('\r\n-----  example 2  -----')
		console.log('result',result);
	}).fail(function(e){
		console.log('error1: ',e.statusCode);
	});

// -------------------------------------------------------------------------------------------------- //
//	ex 3: call q.all from within a function
// -------------------------------------------------------------------------------------------------- //

var funcB = function(x){
console.log('x',x);
	var deferred = Q.defer();
	deferred.resolve(x.toUpperCase());
	return deferred.promise;
};

promisesArr = [funcB('four score'),funcB('and seven'),funcB('years ago...')];

var funcA = function(){
	Q.all(promisesArr)
	.then(function(z){
		console.log('\r\n-----  example 3  -----')
		console.log('z',z);
	}).fail(function(e){
		console.log('e',e);
	})
}();

// -------------------------------------------------------------------------------------------------- //
//	ex 4: call q.all from within a function
// -------------------------------------------------------------------------------------------------- //

var func3 = function(x){
	var deferred = Q.defer();
	deferred.resolve(x.toUpperCase());
	return deferred.promise;
};

promisesArr = [func3('four score'),func3('and seven'),func3('years ago...')];

var func2 = function(){
	var deferred = Q.defer();
	Q.all(promisesArr)
	.then(function(z){
		deferred.resolve(z);
	}).fail(function(e){
		console.log('e',e);
	})
	return deferred.promise;
};

var func1 = function(){
//function func1(){
	func2()
	.then(function(result){
		console.log('\r\n-----  example 4  -----')
		console.log('result',result);
	}).fail(function(e){
		console.log('e',e);
	}).fin(function(){
		console.log('\r\ngame over\r\n');
	})
}();


