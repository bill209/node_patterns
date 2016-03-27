// required module for web server
var http = require('http');

const PORT=3000;

console.log("server is starting up");

// instantiate the server
var server = http.createServer(handleRequest);

// start the server
server.listen(PORT, function(){
	// success callback
	console.log("Server listening on: http://localhost:%s", PORT);
});

// handles http requests and responses
function handleRequest(request, response){
	response.end("don't get too excited. this was really simple. : P");
}
