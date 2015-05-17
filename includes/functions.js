var Q = require('q');
// the following can be used instead of the 'modules.' method below. this is
// cleaner and safer. but commented out here in order to demonstrate
// the other method.
//var exports = module.exports = {};

// -------------------------------------------------------------------------------------------------- //
//  ex 1:  establish the exports object. this only works if exports is
//  empty.
// -------------------------------------------------------------------------------------------------- //

module.exports = function(name, age) {
	this.name = name;
	this.age = age;
	this.about = function() {
			console.log(this.name +' is '+ this.age +' years old');
	};
};

// -------------------------------------------------------------------------------------------------- //
//  ex 2:  we can add modules to exports after its been defined
// -------------------------------------------------------------------------------------------------- //

module.exports.test = function(msg){
	var deferred = Q.defer();
	deferred.resolve('to all good men and women: ' + msg);
	return deferred.promise;
};
