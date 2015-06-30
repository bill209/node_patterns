var Q = require('q');
var REQ = require('request');

bbcPlaylistUrl = "http://www.bbc.co.uk/radio1/playlist.json";
googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:{{isbn}}"
globalx = '';

var ac = function(ms){
console.log('ms',ms);
	 var deferred = Q.defer();
	setTimeout(function(){
	globalx += ms;
		deferred.resolve('ms: '+ms);
	}, ms*500,ms);
	return deferred.promise;
};

function loop(i){
	var deferred = Q.defer();
	console.log('i',i);

	ac(pArr[i])
	.then(function(r){
		deferred.resolve(r);
		console.log('r',r);
		if(++i<pArr.length){
			loop(i)
				.then(function(a){
					deferred.resolve(a);
				});
				return deferred.promise;
		}
	});
	return deferred.promise;
}

pArr = [5,4,3,2,1];

xxx().then(function(z){ console.log('zzzzzzzzzzz',z);});

function xxx(){
	var deferred = Q.defer();
	i=0
	loop(i)
		.then(function(x){
			deferred.resolve(x);
		});
	return deferred.promise;
}
function test(){
	var deferred = Q.defer();
	deferred.resolve = 'abc';
	return deferred.promise;
}

