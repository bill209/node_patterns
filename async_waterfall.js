
var async = require('async');

async.waterfall([
	function(callback){
		func1(callback);
		console.log('A1');
		var x = 3, y=4; // values to pass to second function
		callback(null, x, y);
	},
	function(a, b, callback){
		console.log('A2');
		// a=3, b=4
		var c = a + b;
		callback(null, c);
	},
	function(z, callback){
		console.log('A3');
		// z now equals 7
		callback(null, 'success: ' + z);
	}
	], function (err, results) {
		console.log('results for method A: ',results);
	}
);

function func1(callback){
	console.log('B1');
	var x = 3, y = 8; // values to pass to func2
	callback(null, x, y);
}

function func2(a, b, callback){
console.log('B2');
	var c = a + b; // values to pass to func2
	callback(null, c);
}

function func3(z, callback){
	console.log('B3');
	var x = 3, y = 4; // values to pass to func2
	callback(null, 'success: ' + z);
}

var tasks=[];
tasks.push(function(callback){ func1(callback);});
tasks.push(function(a, b, callback){ func2(a, b, callback);});
tasks.push(function(z, callback){ func3(z, callback);});

async.waterfall(tasks,
	function (err, results) {
			console.log('results for method B: ',results);
	}
)