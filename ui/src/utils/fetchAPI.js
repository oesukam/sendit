const URL = 'https://oesukam.github.io';
const options = {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  },
};

const fetchAPI = (endpoint, config) => new Promise((resolve, reject) => {
  fetch(`${URL}${endpoint}`, { ...options, ...config })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
})

export default fetchAPI;
