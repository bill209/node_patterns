var async = require('async');

var globalx;


function ac(ms,cb){
	console.log('ac: ms',ms);
	setTimeout(function(){
	globalx += ms;
		console.log('ms: '+ms);
	}, ms*500,ms);
	cb(null,'cb good');
};
items=[3,2,1];

var jobs = [
async.apply(ac,3),
async.apply(ac,2)
];
var jobs2 = [
	function(callback){
		ac(3,callback);
	},
	function(callback){
		ac(2,callback);
	}
];

async.series(jobs,
// optional callback
function(err, results){
	console.log('results',results);
	// the results array will equal ['one','two'] even though
	// the second function had a shorter timeout.
});


// items.forEach(function(item){
// 	// We don't actually execute the async action here
// 	// We add a function containing it to an array of "tasks"
// 	// asyncTasks.push(function(callback){
// 	// 	setTimeout(function(){
// 	// 		callback(null, 'one');
// 	// 	}, 200);
// 	// });
// 	asyncTasks.push(function(cb,ms){
// 		console.log('ms',ms);
// 		setTimeout(function(){
// //			console.log('ms: '+ms);
// 			cb(null,'cb worked');
// 		}, 500);
// 	});
// });


// async.parallel(asyncTasks, function(e,r){
// 	// All tasks are done now
// 	console.log('finished',r);
// },7);
