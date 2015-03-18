Map.defaults = {
    center: new google.maps.LatLng(51.5136,-0.1556),
    zoom: 14
};

//create Map instance
function Map(selector, mapOptions) {
    this.map = new google.maps.Map(document.querySelector(selector), mapOptions || Map.defaults);

	this.markers = [];
}

// Centers the map on the set position
Map.prototype.goTo = function (position) {
    var self = this;
    // allow for both LatLng input and string address
    this.parsePosition(position, function (pos, bounds) {
        self.map.setCenter(pos);
        if (bounds)
		{
            self.map.fitBounds(bounds);
		}
    });
    return this;
}

// Go to current location using HTML5 geolocation
Map.prototype.goToMyLocation = function () {
    var self = this;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            self.goTo(pos);
        });
    }
    return this;
}

// Converts a string or object position into a LatLng that can be used by google maps
Map.prototype.parsePosition = function (position, callback) {
    if (typeof position === "string") {
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: position }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var geo = results[0].geometry;
                callback(geo.location, geo.bounds);
            } else {
                alert("This address is invalid.");
            }
        });
    } 
	else {
        if (position instanceof google.maps.LatLng) {
            callback(position);
        } else {
            console.error("The position sent to be parse is not fitting");
        }
    }
}

// Add a marker (requires parsed position)
Map.prototype.addMarker = function(position, image, label){
	if(image === undefined)
	{
		image = "https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png";
	}
	
	var newMarker = new google.maps.Marker({
		position: position,
		map: this.map,
		icon: image,
		title:"Hello World!"
	});
	
	if(label != null){
		var infowindow = new google.maps.InfoWindow({
			content: label
		});
	
		infowindow.open(this.map, newMarker);
	}
	
	this.markers.push(newMarker);
}

// Clear all the markers. Resets map.marker.
Map.prototype.clearMarkers = function(position){
	for(var i = 0; i < this.markers.length; i++){
		this.markers[i].setMap(null);
	}
	this.markers = [];
}