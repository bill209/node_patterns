var Q = require('q');

var func3 = function(x){
console.log('x',x);
	deferred = Q.defer();
	deferred.resolve(x.toUpperCase());
	return deferred.promise;
};

promisesArr = [func3('four score'),func3('and seven'),func3('years ago...')];

var func2 = function(){
	Q.all(promisesArr)
	.then(function(z){
		console.log('z',z);
	}).fail(function(e){
		console.log('e',e);
	}).fin(function(){
		console.log('\r\ngame over\r\n');
	})
}();
