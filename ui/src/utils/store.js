const token = localStorage.getItem('token') || null;
const user = JSON.parse(localStorage.getItem('user') || '')
const data = {
  auth: true || token !== null,
  token,
  user,
  parcels: [],
}

export default data;
