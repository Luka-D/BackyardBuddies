// Create variable to assign user's current geolocation
let pos = { lat: 43.2609, lng: -79.9192}; // Default center is Null Island

// Function to create the map object
function initMap() {
	
  const map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 13.7,
  });
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
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
	
	// setInterval(function(){
    // drawActivityCircle(map, pos)
		// }, 10000)
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
	  // if (activityCircle && activityCircle.setMap)
		// activityCircle.setMap(null);
	
	  // Create the circle
	  const activityCircle = new google.maps.Circle({
	  strokeColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: "#00FF00",
      fillOpacity: 0.15,
	  map,
	  center: pos,
	  radius: 2000,
  })
  
  // Display message boards as map markers
  
}

// Call the map function and display it in the "map" div
// Always goes at the end
window.initMap = initMap;


