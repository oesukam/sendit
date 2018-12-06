
import sideBar from '../../components/leftSideBar.js';
import map from '../../components/googleMap.js';
import { provinces } from '../../mocks/index.js';
import fetchAPI from '../../utils/fetchAPI.js';
import model from '../../utils/model.js';
import getPrice from '../../utils/getPrice.js';
import navigation from '../../utils/navigation.js';

let form = {
  from_province: '',
  from_district: '',
  to_district: '',
  to_province: '',
  receiver_names: '',
  receiver_phone: '',
  receiver_address: '',
  weight: '',
};

const Page = {
  render : async () => {
    const id = navigation.extractRequestURL()[1];
    await fetchAPI(`/parcels/${id}`)
      .then(res => {
        form = res.data;
      })
    const view = `
      <div class="container">
        <div class="row">
          <div class="col-3">
            ${await sideBar.render()}
          </div>
          <div class="col-9">
            <br>
            <div class="box order-container">
              <h2 class="title-1 align-center">Update parcel's destination</h3>
              <div class="quote-result">
                <p>From <strong class="capitalize">${form.from_district}</strong> to 
                  <strong class="capitalize">${form.to_district}</strong>, a parcel of 
                  <strong class="capitalize">${form.weight} KG</strong class="capitalize"> 
                  costs <strong>${form.price.toLocaleString()} RWF</strong>
                </p>
              </div>
              <div class="form-error error-message"></div>
              <form action="#">
                <div class="row">
                  <div class="col-12 align-center">
                    <button
                      id="submit-cancel"
                      class="btn primary"
                      ${ form.status === 'Cancelled' ? 'disabled' : ''}
                    >
                      ${ form.status === 'Cancelled' ? 'Parcel cancelled' : 'Cancel'}
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <span class="custom-dropdown">
                      <select
                        class="capitalize"
                        id="from_province"
                        name="from_province
                        required
                        placeholder="From Province"
                        disabled
                      >
                        <option value="">From: ${form.from_province} Province</option> 
                        <option value="eastern">Eastern Province</option>
                        <option value="kigali">Kigali</option>  
                        <option value="northern">Northen Province</option>
                        <option value="southern">Southern Province</option>
                      </select>
                    </span>
                    <div class="form-error from_province"></div>
                    
                    <span class="custom-dropdown">
                      <select
                        class="capitalize"
                        id="from_district"
                        name="from_district"
                        required
                        disabled
                      >    
                        <option value="">From: ${form.from_district} District</option>
                      </select>
                    </span>
                    <div class="form-error from_district"></div>
                  </div>
                  <div class="col-6">
                    <span class="custom-dropdown">
                      <select id="to_province" name="to_province" required value="southern">
                        <option value="">Province - Destination</option> 
                        <option ${form.to_province === 'eastern' ? 'selected' : ''} value="eastern">
                          Eastern Province
                        </option>
                        <option ${form.to_province === 'kigali' ? 'selected' : ''} value="kigali">
                          Kigali
                        </option>  
                        <option ${form.to_province === 'northern' ? 'selected' : ''} value="northern">
                          Northen Province
                        </option>
                        <option ${form.to_province === 'southern' ? 'selected' : ''} value="southern">
                          Southern Province
                        </option>
                      </select>
                    </span>
                    <div class="form-error to_province"></div>
                    
                    <span class="custom-dropdown">
                      <select class="capitalize" id="to_district" name="to_district" required>    
                        <option value="">${form.to_district}</option>
                      </select>
                    </span>
                    <div class="form-error to_district"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      placeholder="Weight"
                      required
                      value="${form.weight}"
                    >
                    <div class="form-error weight"></div>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      name="phone"
                      id="receiver_phone"
                      placeholder="Phone Number"
                      required
                      value="${form.receiver_phone}"
                    >
                    <div class="form-error receiver_phone"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <input
                      type="text"
                      name="receiver_names"
                      id="receiver_names"
                      placeholder="Receiver's Names"
                      required
                      value="${form.receiver_names}"
                    >
                    <div class="form-error receiver_names"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <textarea
                      placeholder="Enter full address"
                      rows="5"
                      name="receiver_address"
                      id="receiver_address"
                      maxlength="200"
                      required
                      ></textarea>
                    <div class="form-error receiver_address"></div>

                    <button
                      id="submit-form"
                      class="btn primary"
                      ${ form.status !== 'Waiting Pickup' ? 'disabled' : ''}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
              ${await map.render()}
            </div>
          </div>
        </div>
      </div>
    `
    return view;
  },
  after_render: async () => {
    const pricePerKg = 1000;

    const formKeys = Object.keys(form);
    // From province and distrinct
    const fromProvince = document.querySelector('#from_province');
    const fromDistrict = document.querySelector('#from_district');
    // To province and distrinct
    const toProvince = document.querySelector('#to_province');
    const toDistrict = document.querySelector('#to_district');

    const receiverNames = document.querySelector('#receiver_names');
    const receiverPhone = document.querySelector('#receiver_phone');
    const weight = document.querySelector('#weight');
    const receiverAddress = document.querySelector('#receiver_address');
    const quoteResult = document.querySelector('.quote-result');

    const submitForm = document.querySelector('#submit-form');
    const submitCancel = document.querySelector('#submit-cancel');
    const errorMessage = document.querySelector('.form-error.error-message');
    const loading = document.querySelector('.loading');
 
   
    receiverAddress.addEventListener('input', inputHandler);
    receiverNames.addEventListener('input', inputHandler);
    receiverPhone.addEventListener('input', inputHandler);
    weight.addEventListener('input', inputHandler);


    toProvince.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value) {
        renderToProvince(value);
      }
    });
  

    toDistrict.addEventListener('change', (e) => {
      form.to_district = e.target.value
      renderDetails()
    });

    submitForm.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      
      if (validateInputs()) {
        setTimeout(() => loading.classList.remove('active'), 2000);
        return;
      }
      const body = {
        to_province: form.to_province,
        to_district: form.to_district,
        receiver_names: form.receiver_names,
        receiver_address: form.receiver_address,
        receiver_phone: form.receiver_phone,
      }
      fetchAPI(`/parcels/${form.id}/destination`, { method: 'put', body })
        .then((res) => {
          const { data } = res;
          if (res.message) {
            errorMessage.textContent = res.message;
            errorMessage.style.color = 'green';
            const title = res.message || 'Parcel destination updated';
            const body = `
              <p class="capitalize" style="font-size: 1rem; line-height: 2rem;">
                <b>From</b>: ${form.from_province}, ${form.from_district}<br>
                <b>To</b>: ${form.to_province}, ${form.to_district}<br>
                <b>Receiver</b>: ${form.receiver_names}<br>
                <b>Address</b>: ${form.receiver_address}<br>
              </p>
            `
            model({
              title,
              body,
            });
          }

          // Wait for 2 seconds to smooth the spinner
          setTimeout(() => {
            loading.classList.remove('active');
          }, 2000);
        })
        .catch((err) => {
          loading.classList.remove('active');
          console.log(err)
          if (err.message) {
            errorMessage.textContent = err.message;
            errorMessage.style.color = 'red';
          }
        })
    });

    submitCancel.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      
      fetchAPI(`/parcels/${form.id}/cancel`, { method: 'put' })
        .then((res) => {
          const { data } = res;
          if (res.message) {
            errorMessage.textContent = res.message;
            form.stats = 'Cancelled'
            errorMessage.style.color = 'green';
            const title = res.message || 'Parcel delivery cancelled';
            const body = `
              <p class="capitalize" style="font-size: 1rem; line-height: 2rem;">
                <b>Status</b>: Cancelled<br>
                <b>From</b>: ${form.from_province}, ${form.from_district}<br>
                <b>To</b>: ${form.to_province}, ${form.to_district}<br>
                <b>Receiver</b>: ${form.receiver_names}<br>
                <b>Address</b>: ${form.receiver_address}<br>
              </p>
            `
            model({
              title,
              body,
            });
          }

          // Wait for 2 seconds to smooth the spinner
          setTimeout(() => {
            loading.classList.remove('active');
          }, 2000);
        })
        .catch((err) => {
          loading.classList.remove('active');
          console.log(err)
          if (err.message) {
            errorMessage.textContent = err.message;
            errorMessage.style.color = 'red';
          }
        })
    });

    if (form.to_province) {
      renderToProvince(form.to_province);
    }
    // Callback function to handle email and password imput
    function inputHandler (e) {
      form[e.target.id] = e.target.value;
      renderDetails() 
    }
    function renderDetails () {
      const price = getPrice(form.weight);
      form.price = price;
      quoteResult.innerHTML = `
      <p>
        From <strong>${form.from_district || '-'}</strong> 
        to <strong class="capitalize">${form.to_district || '-'}</strong>, a parcel of 
        <strong class="capitalize">${form.weight || '-'} Kg</strong> costs <strong>
        ${price ? price.toLocaleString() : '-'} RWF</strong>
      </p>`;
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
          form[key] = '';
          const tagElement = document.querySelector(`#${key}`);
          if (tagElement) {
            tagElement.textContent = '';
            // tagElement.style.color = 'red'
          }
        }
      });
      return hasError;
    }

    function renderToProvince (value = '') {
      const province = value.toLocaleLowerCase() || '';
      if (provinces[province]) {
        form.to_province = province;
        const districts = provinces[province].districts || []

        toDistrict.options.length = 0; //Reset district option to 0
        toDistrict.options[0] = new Option('Select District'); // Add the first option to district
        // Add all district from the selected province
        for(let index in districts) {
          const selected = index === form.to_district;
          toDistrict.add(new Option(districts[index].name, index, '', selected));
        };
      }
    }
  }
 }
 
 export default Page;
 