var http = require('http'),
    fs = require('fs');
	
var portNo = 8000;

var getFile = function(url){
	return fs.readFileSync("./" + url);
}

var contentTypes = {
    'html': "text/html",
    'js':   "text/javascript",
	'css': "text/css",
	'png': "image/png",
	'ico': "image/x-icon"
};

http.createServer(function (req, res) {
	
	console.log(req.url);
	
	var url = (req.url=="/") ? "index.html" : req.url;
	var urlSplit = url.split(".");
	var extension = urlSplit[urlSplit.length - 1];
	
	if(contentTypes[extension] != undefined){
		res.writeHead(200, {'Content-Type': contentTypes[extension]});
		res.end(getFile(url));
	}
	
}).listen(portNo);

console.log("Server running on port " + portNo);