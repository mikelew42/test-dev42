var path = require("path");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var globule = require('globule');
var cwd = process.cwd();

var entry = {};

var entryFiles = globule.find("./**/*entry.js", "!./node_modules/**").forEach(function(filePath){
	console.log(filePath, path.extname(filePath));
	var entryName = filePath
		.replace(path.extname(filePath), "")
		.replace(".entry", "");

	console.log(entryName);

	entry[entryName] = filePath;

	// entry[entryName] = ["webpack-dev-server/client?http://localhost:8080/", filePath];
});

var config = {
	entry: entry,
	output: {
		path: "./", // or a contentBase..?
		filename:"[name].bundle.js"
	}
};

webpack(config, function(err, stats){
	console.log('err', err);
	// console.log('stats', stats);
});