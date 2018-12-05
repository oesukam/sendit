import initMap from '../utils/initMap.js';
const map = {
  render: async () => `
    <div id="quote-map" class="map-location"> Map location</div>
    <div id="output" class="map-output"><strong>Distance: </strong></div>
   `,
  after_render: async () => {
    initMap();
  },
};

export default map;
 