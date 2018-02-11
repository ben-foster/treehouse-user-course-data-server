const fs = require("fs");

function mergeValues (values, content) {
	for(let key in values){
		content = content.replace("{{" + key + "}}", values[key]);
	}

	return content;
}

const view = (templateName, values, response) => {
	let fileContents = fs.readFileSync("./templates/" + templateName + ".html", {encoding: "UTF-8"});

	fileContents = mergeValues(values, fileContents);

	response.write(fileContents);
}

module.exports.view = view;