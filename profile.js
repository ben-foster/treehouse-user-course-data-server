const EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const util = require("util");

function Profile(username){
	EventEmitter.call(this);

	//stored in a variable to eliminate potential namespace conflicts with "this" keyword in the following code
	const self = this;

	const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) =>{
		
		const statusCode = response.statusCode;
		console.log(statusCode);
		console.log(http.STATUS_CODES[statusCode]);
		
		let responseBody = "";

		if(statusCode !== 200){
			request.abort();
			self.emit("error", new Error(`There was an error getting profile for ${username} [${statusCode}]`));
		}

		response.on("data", chunk => {
			responseBody += chunk.toString();
			self.emit("data", chunk);
		});

		response.on("end", () => {
			if(response.statusCode === 200){
				try{
					const profile = JSON.parse(responseBody);
					self.emit("end", profile);
				} catch (error){
					self.emit("error", error);
				}
			}
		});

		response.on("error", (error) => {
			self.emit("error", error);
		});

	});
}

const printMessage = (username, badgeCount, points) => {
	const message = `${username} has ${badgeCount} total badges and ${points} points in JavaScript`;
	console.log(message);
}

const printError = (error) =>{
	console.error(error.message);
}

util.inherits(Profile, EventEmitter);

module.exports = Profile;