const http = require("http");
const router = require("./router.js");

const server = http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(1337, "127.0.0.1");

console.log("Server running at https://127.0.0.1:1337/");

//4. Function that handles the routing of the files and merge in value
	//read from file and get a string
		//merge values into a string