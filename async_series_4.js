/*
	demonstrate async combined with Q
*/
var async = require('async');
var q = require('q');

vals = [3,2,1];
jobs = [];

// set up an array of asynchronous jobs
for(var i=0; i < vals.length; i++){
	jobs.push(asyncFunc(vals[i]));
}

// call the job expecting a promise
callJobs(jobs)
	.then(function(res){
		console.log('result: ',res);
	});

// async.series calls each job, waiting for
// completion before calling the next
// return a promise
function callJobs(jobs){
	var deferred = q.defer();

	async.series(jobs, function(err, results){
		deferred.resolve(results);
	});
	return deferred.promise;
}

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



