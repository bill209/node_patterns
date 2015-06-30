/*
	async example using an array of async functions with parms
	also: shows the use of .apply v not using .apply to pass parms
*/
var async = require('async');

// create an array of asynchronous job
// passing parameters with .apply
var jobs = [
	async.apply(asyncFunc,3),
	async.apply(asyncFunc,2)
];

// create an array of asynchronous job
// passing parameters without .apply
var jobs2 = [
	function(callback){
		asyncFunc(3,callback);
	},
	function(callback){
		asyncFunc(2,callback);
	}
];

// async.series calls each job, waiting for
//  completion before calling the next
async.series(jobs, function(err, results){
	console.log('results',results);
});

// this is the asynchronous function
function asyncFunc(ms,callback){
	console.log('asyncFunc: ms',ms);
	setTimeout(function(){
		console.log('async ms: '+ms);
		callback(null,'cb good: ' + ms);
	}, ms*500,ms);
};

