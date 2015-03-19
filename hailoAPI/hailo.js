//calls based on https://developer.hailoapp.com/docs
var mapDiv = document.getElementById("map-canvas");
var map = new Map("#map-canvas");
var authorisationKey = "Vvrs8j3quorf4EMc6POPMEZNkFhWCPXV5yYEDtIUmwA9Hphy7qVKRcIkEOkLYxgc3XrxrgxHzHiTrzbHmSLKBQSO2ED74MicHqBpSKvIxvCWzwtHkj4EPDzHUkdfd/skC4I8TJ8aMjNup09Wp4zNH8CEabZyosp6LG+hr96jmDVO1x59EmZtS+0vM9NfJet93cNu7968Ho0p9r6atM060w==";

//set currentPosition to the current center of the map.
var currentPosition = map.map.getCenter();

//sets a position on the map (can be anything... string or else);
var setPositionOnMap = function(position){
	map.parsePosition(position, function(location){
		map.addMarker(location);
		map.goTo(location);
		currentPosition = map.map.getCenter();
		mapDiv.className = "";
	});
}

var addCabToMap = function(position, label){
	map.parsePosition(position, function(location){map.addMarker(location, "./car.png", label);});
}

var addNearbyDriver = function(driver){
	var position = new google.maps.LatLng(driver.latitude,driver.longitude);
	addCabToMap(position, driver.service_type);
}

var addNearbyDrivers = function(drivers){
	for(var i in drivers){
		addNearbyDriver(drivers[i]);
	}
}

var addETA = function(eta)
{
	//TODO: do something in here for a single eta.
	console.log(eta.eta);
}

var addETAs = function(etas){
	for(var i in etas){
		addETA(etas[i]);
	}
}

var getRequest = function(url, callback){
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.setRequestHeader("Accept", "*/*");
	request.send(null);
	var response = request.responseText;
	var JSONresponse = JSON.parse(response);
	
	callback(JSONresponse);
}

var getHailoApiUrl = function(call){
	var authString = "&api_token=" + encodeURI(authorisationKey);
	var hostString = "https://api.hailoapp.com/";
	var locationString = "?latitude=" + currentPosition.k + "&longitude=" + currentPosition.D;
	
	return hostString + call + locationString + authString;
}

var getNearbyDrivers = function(){
	getRequest(getHailoApiUrl("drivers/near"), function(drivers){
		addNearbyDrivers(drivers);
	});
}

var getETAs = function(){
	getRequest(getHailoApiUrl("drivers/eta"), function(drivers){
		addETAs(drivers);
	});
}

var statusUpGet = function(){
	getRequest("https://api.hailoapp.com/status/up?api_token=Vvrs8j3quorf4EMc6POPMEZNkFhWCPXV5yYEDtIUmwA9Hphy7qVKRcIkEOkLYxgc3XrxrgxHzHiTrzbHmSLKBQSO2ED74MicHqBpSKvIxvCWzwtHkj4EPDzHUkdfd/skC4I8TJ8aMjNup09Wp4zNH8CEabZyosp6LG+hr96jmDVO1x59EmZtS+0vM9NfJet93cNu7968Ho0p9r6atM060w==",
		function(response){
			console.log(response);
		}
	);
}
