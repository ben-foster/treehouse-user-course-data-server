const Profile = require("./profile");

const home = (request, response) => {
	if(request.url === "/"){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Header\n");
		response.write("Search\n");
		response.end("Footer\n");
	}
}

const user = (request, response) => {
	const username = request.url.replace("/","");

	if(username.length > 0){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Header\n");
	
		const userProfile = new Profile(username);

		userProfile.on("end", (profileJSON) => {
			
			//store the values we need
			const values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}

			response.write(`${values.username} has ${values.badges} badges and ${values.javascriptPoints} JavaScript points.\n`);
			console.dir(profileJSON);
			response.end("Footer\n");

		});

		userProfile.on("error", (error) => {
			console.error(error.message);
			response.end("Footer\n");
		});
	

	}
}

module.exports.home = home;
module.exports.user = user;