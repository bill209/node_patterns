var Q = require('q');
var REQ = require('request');

bbcPlaylistUrl = "http://www.bbc.co.uk/radio1/playlist.json";

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

function showResults(a,b,c){
	console.log('\r\n-----  example 1  -----')
	console.log('a',a);
	console.log('b',b);
	console.log('c',c);
}

var result = Q.spread(promises, showResults, function(err) {
		console.log('error2', err.statusCode);})


// -------------------------------------------------------------------------------------------------- //
//  ex 1:  q.all - all defers handled as one, looping through results
// -------------------------------------------------------------------------------------------------- //

var func2 = function(color){
	deferred = Q.defer();
	console.log('mixing color ' + color);
	deferred.resolve('my fav color is ' + color);
	return deferred.promise;
}

p = [func2('red'),func2('white'),func2('blue')];

var func1 = function(){
	Q.spread(p,function(a,b,c){
		console.log('\r\n-----  example 2  -----')
		console.log('results: ', a,b,c)
	},function(e){
		console.log('error: ',e);
	})
}(p);
