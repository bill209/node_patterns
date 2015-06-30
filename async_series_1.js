/*
	simple async example
*/
var async = require('async');

async.series([
	function(callback){
		console.log('1');
		setTimeout(function(){
				callback(null, 'one');
			}, 5000);
	},
	function(callback){
		console.log('2');
		setTimeout(function(){
				callback(null, 'one');
			}, 2000);
	},
],
function(err, results){
	console.log('results',results);
});
