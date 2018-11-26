const token = localStorage.getItem('token') || null;

const data = {
  auth: true || token !== null,
  token,
  user: '',
  parcels: [],
}

export default data;
