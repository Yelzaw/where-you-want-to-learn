
// set temp location Fredericton
var fredericton = {lat: 45.9454, lng: -66.6656};

// function to call the map with user input data
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: fredericton,
    zoom: 10
  });
// set marker on the map
  const marker = new google.maps.Marker({
    position: fredericton,
    map: map,
  });

}

// initMap();