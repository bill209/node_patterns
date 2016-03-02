
var async = require('async');

async.waterfall([
	function(callback){
		console.log('1');
		var x = 3, y=4; // values to pass to second function
		callback(null, x, y);
	},
	function(a, b, callback){
		console.log('2');
		// a=3, b=4
		var c = a + b;
		callback(null, c);
	},
	function(z, callback){
		console.log('3');
		// z now equals 7
		callback(null, 'success');
	}
	], function (err, results) {
		console.log('results',results);
	}
);