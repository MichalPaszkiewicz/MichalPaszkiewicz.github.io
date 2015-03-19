var http = require('http'),
    fs = require('fs');
	
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

// HTTP REQUEST START
var options = {
  host: 'api.hailoapp.com',
  path: '/status/up',
  accept: '*/*',
  authorisation: authorisationKey
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
 
}
// HTTP REQUEST END


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

http.request(options, callback).end();