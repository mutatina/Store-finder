var map;
var infowindow;
function Init() // Initial function that calls the geolocation api to get user location
	{
		// HTML5/W3C Geolocation
		if ( navigator.geolocation )
			navigator.geolocation.getCurrentPosition( UserLocation );
		
		
	}
	
	function UserLocation( position )
	{
		initialize(position.coords.latitude , position.coords.longitude);

	}

function initialize(lat,vlong) {
  var myLocation = new google.maps.LatLng(lat, vlong);  //user location

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: myLocation,
    zoom: 13
  });

   // Showing the user the current location
   var userMarker = new google.maps.Marker({
	map:map,
	position: myLocation,
	animation:google.maps.Animation.BOUNCE


});

//Crafting  requests to call to google api.
  var request = {
    location: myLocation,
    radius: 4000,
    types: ['department_store']
	
  };
  
 var request1 = {
    location: myLocation,
    radius: 4000,
    types: ['store'],
    
	
  };
 var request2 = {
    location: myLocation,
    radius: 4000,
    types: ['grocery_or_supermarket']
	
  };

var request3 = {
    location: myLocation,
    radius: 4000,
    types: ['shopping_mall']
	
  };


  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  service.nearbySearch(request1, callback);
  service.nearbySearch(request2, callback);
  service.nearbySearch(request3, callback);

}
//For every results sent back from google map , the function  sends the location to the marker generation function to mark the location on the map.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
// Marker generator
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', Init);
