var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {

		var pathName = url.parse(request.url).pathname;
		console.log("Request for " + pathName + " received.");

		route(pathName, handle, response);
	}

	http.createServer(onRequest).listen(9009);
	console.log("Server has started.");
}

exports.start = start;
