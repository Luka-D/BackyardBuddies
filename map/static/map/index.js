// Create variable to assign user's current geolocation
let pos = { lat: 43.2609, lng: -79.9192}; // Default center is McMaster 
var activityCircle;

// Function to create the map object
function initMap() {
	
  const map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 13.7,
  });
  
  // Draw activity circle for the default map center. 
  // This will be overwritten when the user accepts Geolocation.
  drawActivityCircle(map, pos)
  drawHouses(map, pos)
  
  const infoWindow = new google.maps.InfoWindow();

  // const locationButton = document.createElement("button");
  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
	
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const pos = {
            // lat: position.coords.latitude,
            // lng: position.coords.longitude,
          // };
		  
		  // Set map center to user's geolocation
		  pos['lat'] = position.coords.latitude;
		  pos['lng'] = position.coords.longitude;
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
		  console.log(pos);
		  
		  // Draw circle of all activities within range of user's current position
		  drawActivityCircle(map, pos)
		  
		  //Draw all registered houses within activity circle
		  drawHouses(map, pos)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
	
}

// Error handling if browser doesn't support geolocation or user declines
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// Function to draw activity circle and display all message boards within range
function drawActivityCircle(map, pos) {
	  // Erase activity circle that is already drawn
	  if (activityCircle && activityCircle.setMap)
		activityCircle.setMap(null);
	
	  // Create the circle
	  activityCircle = new google.maps.Circle({
	  strokeColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: "#00FF00",
      fillOpacity: 0.15,
	  map,
	  center: pos,
	  radius: 2000,
	  clickable: false,
  })
  
}

// Display message boards as map markers
function drawHouses(map, pos) {
	console.log(housesData);	
	//Iterate through all houses
	for (let i = 0; i < housesData.length; i++) {	
		//Get coords and address of the house
		const housePosition = housesData[i]['fields']['location'];
		const houseAddress = housesData[i]['fields']['address'];
		
		// Get distance between center and house location to see if it is within the activity circle
		const distance = google.maps.geometry.spherical.computeDistanceBetween (pos, housePosition);
		
		if (distance <= 2000) {
			//Create a marker for the house
			const houseMarker = new google.maps.Marker({
				position: housePosition,
				map,
				title: houseAddress,
				icon: '/media/signpost.png'
			});
			
			console.log(houseAddress)
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				"address": "88 Emerson St"
			}, function(results) {
				console.log(results[0].geometry.location); //LatLng
			});
			
			// Create URL for detailed house page
			const houseURL = window.location.href + "house/" + houseAddress.replace(/\s+/g, '-').toLowerCase();
			
			// Create InfoWindow
			const contentString = 
				`<p><strong>${houseAddress}</strong></p>` + 
				`<p>${housesData[i]['fields']['description']}</p>` +
				'<a href="'+houseURL+'">House Information</a>'

			const markerWindow = new google.maps.InfoWindow({
				content: contentString 
			});

			// Add a click listener for each marker, and set up the info window.
			houseMarker.addListener("click", () => {
				markerWindow.close();
				markerWindow.open(houseMarker.getMap(), houseMarker);
			});
		}
	} 
}

// Call the map function and display it in the "map" div
// Always goes at the end
window.initMap = initMap;


