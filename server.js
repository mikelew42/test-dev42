var path = require("path");

var globule = require('globule');
var cwd = process.cwd();
console.log(cwd);

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var entry = {};

var entryFiles = globule.find(cwd+"/**/*entry.js", "!" + cwd + "/node_modules/**").forEach(function(filePath){
	filePath = path.resolve(filePath); // normalizes the slashes and stuff
	console.log(filePath);
	var entryName = filePath
		.replace(path.extname(filePath), "")
		.replace("entry", "");

	var relPath1 = "." + filePath.replace(cwd, "");
	var relPath2 = "./" + path.relative(cwd, filePath);
	var relPath2_2 = path.resolve("./", relPath2);

	console.log('relPath1', relPath1);
	console.log('relPath2', relPath2);
	console.log('relPath2_2', relPath2_2);

	console.log(entryName);

	entry[entryName] = ["webpack-dev-server/client?http://localhost:8080/", relPath2];
});

var config = {
  devtool: 'inline-source-map',
  entry: entry,
  output: {
  	path: cwd,
    filename: "[name]bundle.js"
  }
};

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	quiet: false,
	// publicPath: "/",
	inline: true
});
server.listen(8080, "localhost");