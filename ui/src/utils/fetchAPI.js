import store from './store.js';
const URL = '/api/v1';

const { token = '' } = store;
const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
};

const fetchAPI = (endpoint, config) => new Promise((resolve, reject) => {
  let options = {
    ...defaultOptions,
    ...config,
  }
  // Converts a given json body to string
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }
  
  fetch(`${URL}${endpoint}`, options)
    .then((res) => res.json() || {})
    .then((res) => {
      resolve(res)
    })
    .catch((err) => reject(err));
})

export default fetchAPI;
