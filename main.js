//Problem: we need a simple way to get a user's bage count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile lookup and serve our template files via HTTP to client.
const http = require("http");
const router = require("./router.js");

//1. Create a web server
const server = http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(1337, "127.0.0.1");

console.log("Server running at https://127.0.0.1:1337/");

	//if url === GET && /
		//show search input
	//if url === POST && /
		//redirect to /:username

//3. Handle HTTP GET /:username e.g.(/chalkers)
	// if url === "/..."
		//get json from treehouse
			//on "end"
				//show profile
			//on "error"
				//show error

//4. Function that handles the routing of the files and merge in value
	//read from file and get a string
		//merge values into a string