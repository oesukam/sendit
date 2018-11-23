import initUsers from './users';
import initParcels from './parcels';

const initData = () => {
  initUsers(); // Initialises global users array
  initParcels();
};

export default initData;
