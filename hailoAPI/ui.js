var menuOpen = false;

var toggleMenu = function(){
	var menuContainer = document.getElementById("menu-container");
	if(menuOpen){
		menuContainer.className = "";
	}
	else{
		menuContainer.className = "show";
	}
	
	menuOpen = !menuOpen;
}

var searchLocation = function(id){
	map.clearMarkers();
	document.getElementById("main-container").className = "hidden";
	var location = document.getElementById(id).value;
	setPositionOnMap(location);
}

var goToCurrentLocation = function(){
	map.clearMarkers();
	document.getElementById("main-container").className = "hidden";
	//finds user's current location.
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.goTo(pos);
			setPositionOnMap(map.map.getCenter());
        });
    }
}

var clickETAs = function(){
	
}

var clickDrivers = function(){
	
}

//useCurrentPosition