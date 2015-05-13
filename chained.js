var FS = require('fs');
var Q = require('q');
var REQ = require('request');


// -------------------------------------------------------------------------------------------------- //
//  ex 1: using declared functions for the defer as well as declared
//  functions within each .then
// -------------------------------------------------------------------------------------------------- //

files = ['data/test1.txt', 'data/test2.txt', 'data/test3.txt', 'data/test4.txt'];

for (var i = 0; i < files.length; i++) {
	readFile(files[i])
	.then(changeText)
	.then(output)
	.fail(function (err) {
		console.log('this is bad ' + err.message);
	}).fin(function(){
		// this fires at the end of each defer
	});
};

function readFile(fname){
	var deferred = Q.defer();

	FS.readFile(fname, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}

function changeText(content) {
	var d = Q.defer();
	var newContent = content.replace(/-/g,'+'); // replace dashes with plus signs
	d.resolve(newContent);
	return d.promise;
};

function output(content) {
	var d = Q.defer();
	console.log(content);
};

// -------------------------------------------------------------------------------------------------- //
//  ex 2: using assigned functions for the defer and anonymouse
//  functions within each .then
//  note: the content of assigned functions are not hoisted,  so
//  declare them before they are needed.
// -------------------------------------------------------------------------------------------------- //

var londonWxUrl = "http://api.openweathermap.org/data/2.5/weather?q=London,uk";
var apexWxUrl = "http://api.openweathermap.org/data/2.5/weather?zip=27502,us";

var getWeather = function (wxUrl) {
		 var deferred = Q.defer();
		 REQ({url:wxUrl}, function(err, res, content){
			if (!err && res.statusCode == 200) {
				var result  = JSON.parse(content);
				deferred.resolve(result);
			} else {
				console.log(res.statusCode);
			}
		 })
		 return deferred.promise;
};

getWeather(londonWxUrl)
	.then(function (res) {
		console.log('\r\n'+res.name+": ",parseInt(res.main.temp - 273.15,10) + "c");  // kelvin (-273.15)
		return getWeather(apexWxUrl);
	}).then(function (res) {
		return ({ "city":res.name, "temp":res.main.temp});
	}).then(function(res){
		console.log(res.city + ": ",parseInt(res.temp * 9 / 5 - 459.67,10) + "f");
	}).fail(function (error) {
		console.log('Something went wrong: ' + error.message);
	}).fin(function(){
		console.log('THE END');
	});



