const token = localStorage.getItem('token') || null;
let user = localStorage.getItem('user') || ''
const data = {
  auth: token !== null,
  token,
  user: user ? JSON.parse(user) : '',
  parcels: [],
  logout: () => {
    localStorage.setItem('token', null);
    localStorage.setItem('user', '');
    this.auth = false;
    this.token = null
    this.user = '';
    this.parcels = [];
    console.log(this)
    return true;
  }
}

export default data;
