import map from './googleMap.js';
import { provinces } from '../mocks/index.js';
import getPrice from '../utils/getPrice.js'
import store from '../utils/store.js';

let form = {
  from_province: '',
  from_district: '',
  to_province: '',
  to_district: '',
  weight: '',
  price: ''
};

const Page = {
 render : async () => `
    <div class="container">
    ${await map.render()}
    <div class="box quote-container">
      <div class="quote-result">
        <p class="p-10">From <strong>-</strong> to <strong>-</strong>, a parcel of 
          <strong>-</strong> costs <strong>-</strong>
        </p>
      </div>
      <p class="quote-error">
      </p>
      <form action="#">
        <div class="row">
          <div class="col-4">
            <h3 class="title is-white">From</h3>

            <label for="fromProvince">Province</label>
            <span class="custom-dropdown">
              <select id="from_province" name="fromProvince">
                <option value="">Select</option> 
                <option value="eastern">Eastern Province</option>
                <option value="kigali">Kigali</option>  
                <option value="northern">Northen Province</option>
                <option value="southern">Southern Province</option>
              </select>
            </span>
            
            <label for="from_district">District</label>
            <span class="custom-dropdown">
              <select id="from_district" name="fromDistrict">    
                <option value="eastern">Select</option>
              </select>
            </span>
          </div>
          <div class="col-4">
            <h3 class="title is-white">To</h3>
            
            <label for="toProvince">Province</label>
            <span class="custom-dropdown">
              <select id="to_province" name="toProvince">
                <option value="">Select</option> 
                <option value="eastern">Eastern Province</option>
                <option value="kigali">Kigali</option>  
                <option value="northern">Northen Province</option>
                <option value="southern">Southern Province</option>
              </select>
            </span>
            
            <label for="to_district">District</label>
            <span class="custom-dropdown">
              <select id="to_district" name="toDistrict">    
                <option value="eastern">Select</option>
              </select>
            </span>
          </div>
          <div class="col-4">
            <label for="from" class="title is-white">Weight</label>
            <input type="number" name="weight" id="weight">
            <div class="form-error"></div>
            <button id="submit-quote" class="btn">Quote</button>
            ${
              store.auth
              ? '<button id="submit-order" disabled class="btn bg-green">Make order</button>'
              : '<button id="submit-order" class="btn bg-green">Login</button>'
            }
            
          </div>
        </div>
      </form>
    </div>
  </div>
 `,
 after_render: async () => {
  await map.after_render();
  const ids = {
    from_province: 'from_district',
    to_province: 'to_district'
  }
  
   // Initialise select inputs and errors
  const fromProvince = document.querySelector('#from_province');
  const toProvince = document.querySelector('#to_province');
  const fromDistrict = document.querySelector('#from_district');
  const toDistrict = document.querySelector('#to_district');
  const quoteError = document.querySelector('.quote-error');
  const submitQuote = document.querySelector('#submit-quote');
  const submitOrder = document.querySelector('#submit-order');
  const quoteResult = document.querySelector('.quote-result');
  const weight = document.querySelector('#weight');
  const loading = document.querySelector('.loading');

  weight.addEventListener('input', inputHandler);

  fromProvince.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value) {
      form.from_province = value;
      const districts = provinces[value].districts || []

      fromDistrict.options.length = 0; //Reset district option to 0
      fromDistrict.options[0] = new Option('Select District'); // Add the first option to district

      // Add all district from the selected province
      for(let index in districts) {
        fromDistrict.add(new Option(districts[index].name, index));
      };
    }
  });

  toProvince.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value) {
      form.to_province = value;
      const districts = provinces[value].districts || []

      toDistrict.options.length = 0; //Reset district option to 0
      toDistrict.options[0] = new Option('Select District'); // Add the first option to district

      // Add all district from the selected province
      for(let index in districts) {
        toDistrict.add(new Option(districts[index].name, index));
      };
    }
  });

  fromDistrict.addEventListener('change', (e) => {
    form.from_district = e.target.value
    renderDetails()
  });

  toDistrict.addEventListener('change', (e) => {
    form.to_district = e.target.value
    renderDetails()
  });

  submitQuote.addEventListener('click', (e) => {
    e.preventDefault();
    loading.classList.add('active');
    
    if (validateInputs()) {
      setTimeout(() => loading.classList.remove('active'), 2000);
      return;
    }
    map.after_render(form.from_district, form.to_district);
    setTimeout(() => {
      loading.classList.remove('active');
    }, 2000);

  });

  submitOrder.addEventListener('click', (e) => {
    e.preventDefault();
    if (!store.auth) {
      location.href = '/#/login';
      return;
    }
    loading.classList.add('active');
    let query = `?from_province=${form.from_province}`;
    query += `&from_district=${form.from_district}`;
    query += `&to_province=${form.to_province}`;
    query += `&to_district=${form.to_district}`;
    query += `&weight=${form.weight}`;
    location.href = `/#/create_parcel${query}`;
    setTimeout(() => {
      loading.classList.remove('active');
    }, 2000);

  });
  // Callback function to handle email and password imput
  function inputHandler (e) {
    let { value, id } = e.target;
    if (id === 'receiver_phone') {
      value = value.replace(/\D+/g, '');
    }
    form[id] = value;
    renderDetails();
  }

  function makeOrderHandler () {
    if (
      form.from_province
      && form.from_district
      && form.to_province
      && form.to_district
      && form.weight
      && store.auth
    ) {
      submitOrder.removeAttribute('disabled');
    } else {
      submitOrder.setAttribute('disabled', true);
    }
  }
  function renderDetails () {
    const price = getPrice(form.weight) || '';
    form.price = price;
    quoteResult.innerHTML = `
    <p>
      From <strong class="capitalize">${form.from_district || '-'}</strong> 
      to <strong class="capitalize">${form.to_district || '-'}</strong>, a parcel of 
      <strong class="capitalize">${form.weight || '-'} Kg</strong> costs <strong>
      ${price ? price.toLocaleString() : '-'} RWF</strong>
    </p>`;
    makeOrderHandler(); 
  }

  function validateInputs () {
    const keys = Object.keys(form);
    let hasError = false;
    keys.forEach(key => {
      if (!form[key] && form[key] !== 0) {
        const tagElement = document.querySelector(`.form-error.${key}`);
        if (tagElement) {
          tagElement.textContent = 'Required';
          tagElement.style.color = 'red'
          hasError = true;
        }
      }
      // Set all null field to an empty string
      if (form[key] === null) {
        form[key] = '';
      }
    });
    return hasError;
  }

  function resetInputs () {
    const keys = Object.keys(form);
    let hasError = false;
    keys.forEach(key => {
      if (!form[key] && form[key] !== 0) {
        form[key] = ''
        document.querySelector(`#${key}`).textContent = ''
        // document.querySelector(`#form-error`). = 'red'
      }
    });
    return hasError;
  }
 }
}

export default Page;