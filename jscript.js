let map;
let mrkr = null;
let myLocation = { lat: 0, lng: 0 }; // Default starting location

function getPosition() {
  $.get("gps_data.txt", function (data) {
    const vals = data.split(",");
    const lat = parseFloat(vals[0]);
    const lng = parseFloat(vals[1]);

    if (!isNaN(lat) && !isNaN(lng)) {
      myLocation = new google.maps.LatLng(lat, lng);
      changeMarkerPosition();
    }
  }, "text");
}

function changeMarkerPosition() {
  mrkr.setPosition(myLocation);
  map.setCenter(myLocation);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLocation,
    zoom: 19,
  });

  mrkr = new google.maps.Marker({
    position: myLocation,
    map,
    title: "My Location",
  });

  setInterval(getPosition, 1000);
}
