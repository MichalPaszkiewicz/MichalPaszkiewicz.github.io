//calls based on https://developer.hailoapp.com/docs
var mapDiv = document.getElementById("map-canvas");
var map = new Map("#map-canvas");

//set currentPosition to the current center of the map.
var currentPosition = map.map.getCenter();

//sets a position on the map (can be anything... string or else);
var setPositionOnMap = function(position, callback){
	map.parsePosition(position, function(location){
		map.addMarker(location);
		map.goTo(location);
		currentPosition = map.map.getCenter();
		mapDiv.className = "";
		callback();
	});
}

var addCabToMap = function(position){
	map.parsePosition(position, function(location){map.addMarker(location, "./car.png");});
}

var addNearbyDriver = function(driver){
	var position = new google.maps.LatLng(driver.latitude,driver.longitude);
	addCabToMap(position);
}

var addNearbyDrivers = function(drivers){
	for(var i in drivers){
		addNearbyDriver(drivers[i]);
	}
	map.zoomOut();
}

var addETA = function(eta)
{
	var parent = document.getElementById("etas");
	var newNode = document.createElement("div");
	var text = "There are " + eta.count + " hailo cabs just " + eta.eta + " minute(s) away!";
	newNode.appendChild(document.createTextNode(text));
	parent.appendChild(newNode);
	//TODO: do something in here for a single eta.
	console.log(eta.eta);
}

var addETAs = function(etas){
	var etaDiv = document.getElementById("etas");
	while (etaDiv.firstChild) {
		etaDiv.removeChild(etaDiv.firstChild);
	}
	for(var i in etas){
		addETA(etas[i]);
	}
}

var getRequest = function(url, callback){
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send();
	var response = request.response;
	var JSONresponse = JSON.parse(response);
	
	callback(JSONresponse);
}

var getHailoApiUrl = function(call){
	var locationString = "?latitude=" + currentPosition.k + "&longitude=" + currentPosition.D;
	return call + locationString;
}

var getNearbyDrivers = function(){
	getRequest(getHailoApiUrl("drivers/near"), function(drivers){
		addNearbyDrivers(drivers.drivers);
	});
}

var getETAs = function(){
	getRequest(getHailoApiUrl("drivers/eta"), function(drivers){
		addETAs(drivers.etas);
	});
}
