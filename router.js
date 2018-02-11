const Profile = require("./profile");
const renderer = require("./renderer");
const queryString = require("querystring");

const home = (request, response) => {
	if(request.url === "/"){
		if(request.method.toUpperCase() === "GET"){
			response.writeHead(200, {"Content-Type": "text/html"});
			renderer.view("header",{}, response);
			renderer.view("search",{}, response);
			renderer.view("footer",{}, response);
			response.end();
		} else if (request.method.toUpperCase() === "POST"){
			request.on("data", (postBody) => {
				const query = queryString.parse(postBody.toString());
				response.writeHead(303, {"Location": "/" + query.username});
				response.end();
			});
		}
	}
	return;
}

const favicon = (request, response) => {
	if(request.url === "/favicon.ico"){
		response.writeHead(204, {"Content-Type": "image/x-icon"});
		response.end();
		console.log("favicon requested");
	}
	return;
}

const user = (request, response) => {
	const username = request.url.replace("/","");

	if(username.length > 0){
		response.writeHead(200, {"Content-Type": "text/html"});
		renderer.view("header",{}, response);
	
		const userProfile = new Profile(username);

		userProfile.on("end", (profileJSON) => {
			
			//store the values we need
			const values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}

			renderer.view("profile", values, response);
			renderer.view("footer",{}, response);
			response.end();
		});

		userProfile.on("error", (error) => {	
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search",{}, response);
			renderer.view("footer",{}, response);
			response.end();
		});
	}

	return;
}

module.exports.home = home;
module.exports.favicon = favicon;
module.exports.user = user;