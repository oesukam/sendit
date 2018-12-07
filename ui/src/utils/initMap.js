const destinationIcon = 'https://chart.googleapis.com/chart?' +
  'chst=d_map_pin_letter&chld=D|FF0000|000000';
const originIcon = 'https://chart.googleapis.com/chart?' +
  'chst=d_map_pin_letter&chld=O|FFFF00|000000';

const kigaliLatLng = { lat: -1.935114, lng: 30.082111 };
let map;
const initMap = ({ from = { lat: -1.935114, lng: 30.082111 }, to = '' } = {}) => {
  const mapElement = document.getElementById('quote-map');
  const bounds = new google.maps.LatLngBounds;
  let markersArray = [];
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      center: kigaliLatLng,
      zoom: 10
    });

    const geocoder = new google.maps.Geocoder;

    const service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [from],
      destinations: [to || from],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const outputDiv = document.getElementById('output');
        if (outputDiv) {
          outputDiv.innerHTML = '<strong>Distance: </strong>';
        }
        deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = function(asDestination) {
          const icon = asDestination ? destinationIcon : originIcon;
          return function(results, status) {
            if (status === 'OK') {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: icon
              }));
            } else {
              console.log('Geocode was not successful due to: ' + status);
            }
          };
        };

        for (var i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode(
            { 'address': originList[i] },
            showGeocodedAddressOnMap(false)
          );
          for (let j = 0; j < results.length; j++) {
            geocoder.geocode(
              {'address': destinationList[j]},
              showGeocodedAddressOnMap(true)
            );
            outputDiv.innerHTML += `
              ${originList[i]} to ${destinationList[j]}: ${results[j].distance.text} 
              in ${results[j].duration.text} <br>
            `;
          }
        }

      }
    })
  }
}

// Remove all markers from the map
function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

window.initMap = initMap

export default initMap;