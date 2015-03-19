var http = require('http'),
    fs = require('fs'),
	request = require('request');;
	
var portNo = 8000;
var authorisationKey = "Vvrs8j3quorf4EMc6POPMEZNkFhWCPXV5yYEDtIUmwA9Hphy7qVKRcIkEOkLYxgc3XrxrgxHzHiTrzbHmSLKBQSO2ED74MicHqBpSKvIxvCWzwtHkj4EPDzHUkdfd/skC4I8TJ8aMjNup09Wp4zNH8CEabZyosp6LG+hr96jmDVO1x59EmZtS+0vM9NfJet93cNu7968Ho0p9r6atM060w==";


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

var lat = 51.5136;
var lng = -0.1556;
var authString = encodeURI(authorisationKey);

var statusUpURL = 'https://api.hailoapp.com/status/up';

var nearURL = 'https://api.hailoapp.com/drivers/near?' + "latitude=" + lat + "&longitude=" + lng;

var headers = {
	"Authorization":"token " + authString,
	"Allow":"*/*"	
};

request.get({url: statusUpURL, headers: headers}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log("success");
		console.log(body);
	}
	else{
		console.log("fail");
		console.log(JSON.stringify(response));
	}
});

var getRequest = function(type, callback){
	var reqURL = 'https://api.hailoapp.com/' + type;
	
	request.get({url: reqURL, headers: headers}, function (error, response, body) {
		callback(body);
		if (!error && response.statusCode == 200) {
			console.log("success");
		}
		else{
			console.log("fail");
			console.log(JSON.stringify(response));
		}
	});
}

http.createServer(function (req, res) {
	
	console.log(req.url);
	
	var url = (req.url=="/") ? "index.html" : req.url;
	var urlSplit = url.split(".");
	var extension = urlSplit[urlSplit.length - 1];
	
	if(req.url.indexOf("drivers") != -1){
		getRequest(req.url.substring(1), function(text){
			res.writeHead(200, {'Content-Type': "text/javascript"});
			res.end(text);
		});

	}
	else if(contentTypes[extension] != undefined){
		res.writeHead(200, {'Content-Type': contentTypes[extension]});
		res.end(getFile(url));
	}
	
}).listen(portNo);

console.log("Server running on port " + portNo);

