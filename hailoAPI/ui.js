var menuOpen = false;
var menuContainer = document.getElementById("menu-container");

var openMenu = function(){
	menuContainer.className = "show";
	menuOpen = !menuOpen;
}

var closeMenu = function(){
	menuContainer.className = "";
	menuOpen = !menuOpen;
}

var toggleMenu = function(){
	if(menuOpen){
		closeMenu();
	}
	else{
		openMenu();
	}	
}

var searchLocation = function(id){
	map.clearMarkers();
	document.getElementById("main-container").className = "hidden";
	var location = document.getElementById(id).value;
	setPositionOnMap(location, function(){getETAs();getNearbyDrivers();});

	closeMenu();
}

var goToCurrentLocation = function(){
	map.clearMarkers();
	document.getElementById("main-container").className = "hidden";
	//finds user's current location.
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.goTo(pos);
			setPositionOnMap(map.map.getCenter(), function(){getETAs();getNearbyDrivers();});
        });
    }
	
	getETAs();
	closeMenu();
}

var clickETAs = function(){
	getETAs();
	closeMenu();
}

var clickDrivers = function(){
	map.clearMarkers();
	map.addMarker(currentPosition);
	getNearbyDrivers();
	closeMenu();
}