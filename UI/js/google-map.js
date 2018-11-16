let geoLocUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
let map;
let service;
let infowindow;
const apiKey = 'AIzaSyDu_9x-afqT01pFFB3vc4cDRObiSVIen1I'
function initMap() {
  const kigaliLatLng = {lat: -1.935114, lng: 30.082111};
  const telHouseLatLng = {lat: -1.9444501, lng: 30.0874877}
  // New map
  map = new google.maps.Map(document.getElementById('quote-map'), {
    center: kigaliLatLng,
    zoom: 8
  });

  // Initialise a marker
  let marker = new google.maps.Marker({
    position: kigaliLatLng,
    animation: google.maps.Animation.DROP,
    title: 'Hello World!'
  });

  // Add marker to the map
  marker.setMap(map);
}

// geoCoding to use Google Geocoding API and need substriction
function geoCoding (text = '') {
  if (text) {
    fetch(`${geoLocUrl}${text}&region=rw&key=${apiKey}`)
    .then(res => res.json())
    .then(res => console.log('res', res))
    .catch(err => console.log(err))
  }
  return
}