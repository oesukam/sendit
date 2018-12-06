let map;
function initMap() {
  const kigaliLatLng = {lat: -1.935114, lng: 30.082111};
  const mapElement = document.getElementById('quote-map');
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      center: kigaliLatLng,
      zoom: 8
    });
  }
}
