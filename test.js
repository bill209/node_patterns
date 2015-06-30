// test modification
var Q=require('q');
var fs=require('fs');

// --------------------------------------------------------------------------------------------------
//  ex 1: callback v promise
// --------------------------------------------------------------------------------------------------

// node.js callback style function
fs.stat('data/test1.txt', function(err, stat) {
	if (err) {
		console.log('err from callback:', err);
	} else {
		console.log('size from callback:', stat.size);
	}
});

// use Q.denodeify() to translate the callback style function to a promise style function
var stat = Q.denodeify(fs.stat);

// promise style function
stat('data/test2.txt')
.then(function(stat) {
	console.log('size from promise:', stat.size);
}).then(null, function(err) {
	console.log('err from promise:', err);
});


// --------------------------------------------------------------------------------------------------
//  ex 1: this example may not be necessary
// --------------------------------------------------------------------------------------------------

function map (arr, iterator) {
	// execute the func for each element in the array and collect the results
	var promises = arr.map(function (el) { return iterator(el) })
	return Q.all(promises) // return the group promise
}
var fs_stat = Q.denodeify(fs.stat)
map(['data/test1.txt', 'data/test2.txt', 'data/test3.txt'], fs_stat).then(console.log, console.error)
