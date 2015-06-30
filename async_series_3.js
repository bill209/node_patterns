/*
	async example: pushing the functions onto the array with parms
*/
var async = require('async');

vals = [3,2,1];
jobs = [];

// set up an array of asynchronous jobs
for(var i=0; i < vals.length; i++){
	jobs.push(asyncFunc(vals[i]));
}

// async.series calls each job, waiting for
//  completion before calling the next
async.series(jobs, function(err, results){
	console.log('results',results);
});

// this is the asynchronous function
function asyncFunc(ms){
	return function(callback){
		console.log('ac: ms',ms);
		setTimeout(function(){
			console.log('async ms: '+ms);
			callback(null,'callback: ' + ms);
		}, ms*500,ms);
	}
};

