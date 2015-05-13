var Q = require('q');
var REQ = require('request');

bbcPlaylistUrl = "http://www.bbc.co.uk/radio1/playlist.json";
googleBooksUrl = "https://zzzwww.googleapis.com/books/v1/volumes?q=isbn:{{isbn}}"
// -------------------------------------------------------------------------------------------------- //
//  ex 5:
// -------------------------------------------------------------------------------------------------- //

var getAuthorFromGoogle = function (isbn) {
		 var deferred = Q.defer();
		 var u = googleBooksUrl.replace('{{isbn}}',isbn);
		 REQ({url:u}, function(err, res, content){
			if (!err && res.statusCode == 200) {
				var result  = JSON.parse(content);
// console.log('resultITEMS********',result.items[0].volumeInfo.title);
// console.log('resultITEMS********',result.items[0].volumeInfo.authors[0]);
				deferred.resolve(result);
			} else if(res.statusCode != 200){
				deferred.reject('server status' + res.statusCode);
			} else {
				deferred.reject('error' + err);
			}
		 })
		 return deferred.promise;
};

promisesArr = [getAuthorFromGoogle('9780007141937')];
//promisesArr = [getAuthor('The Book Thief'), getAuthor('The Road'),getAuthor('Green Eggs and Ham')];

var bunchOPromises = Q.all(promisesArr);
bunchOPromises.spread(function (results) {
	console.log(results.items[0].volumeInfo.title);
}).fail(function(e){
	console.log('error: ',e)
});



// -------------------------------------------------------------------------------------------------- //
//  ex 5:
// -------------------------------------------------------------------------------------------------- //




var getPlaylist = function (num) {
		 var deferred = Q.defer();
		 REQ({url:bbcPlaylistUrl}, function(err, res, content){
			if (!err && res.statusCode == 200) {
				var result  = JSON.parse(content);
				deferred.resolve(result.playlist.hottestrecord2013[num].title);
			} else if(res.statusCode){
				deferred.reject(res);
			} else {
				deferred.reject('bummer');
			}
		 })
		 return deferred.promise;
};

promises = [getPlaylist(0), getPlaylist(1), getPlaylist(2)]

Q.all(promises)
	.then(function(result) {
		console.log('result',result);
		// for (var i = 0, len = result.length; i < len; i++) {
		// 	console.log('result.result',result[i].result);
		// }
	}).fail(function(e){
		console.log('error1: ',e.statusCode);
	});
// -------------------------------------------------------------------------------------------------- //
//  ex 5: using .spread to render the results separately
// -------------------------------------------------------------------------------------------------- //

function showResults(a,b,c){
	console.log('a',a);
	console.log('b',b);
	console.log('c',c);
}

return Q.spread(promises, showResults, function(err) {
		console.log('error2', err.statusCode);})

console.log('-------------------------------------');


// -------------------------------------------------------------------------------------------------- //
//
// -------------------------------------------------------------------------------------------------- //
console.log('-----------');
//var promisesArr = [getPlaylist(0), getPlaylist(1)];

// Q()
//   .then(function () {
//     return promisesArr; // return a list
//   })
//   .all()
//   .then(function (results) {
//   	console.log('results',results);
//   }).rej(function(res){
//   	console.log('error',results);
//   });
