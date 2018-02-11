const http = require("http");
const router = require("./router.js");

http.createServer(function (request, response) {

	if(request.url === "/favicon.ico") {
		router.favicon(request, response);
		return;
	}

	router.home(request, response);
	router.user(request, response);
}).listen(1337);

console.log("Server running at http://127.0.0.1:1337/");

//4. Function that handles the routing of the files and merge in value
	//read from file and get a string
		//merge values into a string