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
let parcelStatus;
let parcelPresentLocation;

const Page = {
  render : async () => {
    const id = navigation.extractRequestURL()[1];
    await fetchAPI(`/parcels/${id}`)
      .then(res => {
        form = res.data;
        parcelStatus = res.data.status;
        parcelPresentLocation = res.data.present_location;
      })
    const view = `
      <div class="container">
        <div class="row">
          <div class="col-3">
            ${await sideBar.render()}
          </div>
          <div class="col-9">
            ${await map.render()}
            <div class="box order-container">
              <h2 class="title-1 align-center">Parcel's details</h3>
              <div class="quote-result">
                <p>From <strong class="capitalize">${form.from_district}</strong> to 
                  <strong class="capitalize">${form.to_district}</strong>, a parcel of 
                  <strong class="capitalize">${form.weight} KG</strong class="capitalize"> 
                  costs <strong>${form.price.toLocaleString()} RWF</strong>
                </p>
              </div>
              <div class="form-error error-message"></div>
              <form action="#">
                <div class="row content-center">
                  <div class="col-6 align-center">
                    <div class="checkbox-block content-center">
                      <label for="cancelled">Cancelled</label>
                      <input class="checkbox" type="checkbox" name="cancelled" disabled /> 
                    </div>
                  </div>
                </div>
                <div class="row content-center">
                  <div class="col-6 align-center">
                    <label for="status">Order Status</label>
                    <div class="is-row">
                      <span class="custom-dropdown flex-1">
                        <select id="status" name="status">
                          <option 
                            ${form.status === 'Waiting Pickup' ? 'selected' : ''}
                            value="Waiting Pickup"
                          >Waiting Pickup</option>
                          <option
                            ${form.status === 'Pick Up' ? 'selected' : ''}
                            value="Pick Up"
                          >Pick Up</option>  
                          <option
                            ${form.status === 'In Transit' ? 'selected' : ''}
                            value="In Transit"
                          >In Transit</option>
                          <option
                            ${form.status === 'Delivered' ? 'selected' : ''}
                            value="Delivered"
                          >Delivered</option>
                        </select>
                      </span>
                      <button
                        id="submit-status"
                        class="btn primary"
                        disabled
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div class="col-6 align-center">
                    <label for="orderStatus">Present Location</label>
                    <div class="is-row">
                      <input
                        type="text"
                        name="present_location"
                        id="present_location"
                        placeholder="Present Location"
                        value="${form.present_location}"
                      >
                      <button
                        id="submit-location"
                        class="btn primary"
                        disabled
                      >
                        Update
                      </button>
                    </div>
                    <div class="form-error receiver_names"></div> 
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <label for="from_province">From</label>
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
                    <label for="to_province">To</label>
                    <span class="custom-dropdown">
                      <select
                        id="to_province"
                        name="to_province"
                        required
                        value="southern"
                        disabled
                      >
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
                      <select
                        class="capitalize"
                        id="to_district"
                        name="to_district"
                        required
                        disabled
                      >    
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
                      disabled
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
                      disabled
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
    return view;
  },
  after_render: async () => {
    const pricePerKg = 1000;
    map.after_render(form.from_district, form.present_location || form.to_district);

    const formKeys = Object.keys(form);
    // From province and distrinct
    const fromProvince = document.querySelector('#from_province');
    const fromDistrict = document.querySelector('#from_district');
    // To province and distrinct
    const toProvince = document.querySelector('#to_province');
    const toDistrict = document.querySelector('#to_district');

    const status = document.querySelector('#status');
    const presentLocation = document.querySelector('#present_location');
    const receiverNames = document.querySelector('#receiver_names');
    const receiverPhone = document.querySelector('#receiver_phone');
    const weight = document.querySelector('#weight');
    const receiverAddress = document.querySelector('#receiver_address');
    const quoteResult = document.querySelector('.quote-result');

    const submitLocation = document.querySelector('#submit-location');
    const submitStatus = document.querySelector('#submit-status');
    const errorMessage = document.querySelector('.form-error.error-message');
    const loading = document.querySelector('.loading');
 
  
    status.addEventListener('input', inputHandler);
    presentLocation.addEventListener('input', inputHandler);
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

    submitStatus.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      
      if (validateInputs()) {
        setTimeout(() => loading.classList.remove('active'), 2000);
        return;
      }
      const body = {
        status: form.status,
      }
      fetchAPI(`/parcels/${form.id}/status`, { method: 'put', body })
        .then((res) => {
          const { data } = res;
          if (res.message) {
            parcelPresentLocation = form.present_location;
            parcelStatus = form.status;
            status.setAttribute('disabled', true);
            presentLocation.setAttribute('disabled', true);
            errorMessage.textContent = res.message;
            errorMessage.style.color = 'green';
            const title = res.message || 'Parcel status updated';
            const body = `
              <p class="capitalize" style="font-size: 1rem; line-height: 2rem;">
                <b>Status</b>: ${form.status}<br>
                <b>Current Location</b>: ${form.present_location}<br>
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

    submitLocation.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      
      if (validateInputs()) {
        setTimeout(() => loading.classList.remove('active'), 2000);
        return;
      }
      const body = {
        present_location: form.present_location,
      }
      fetchAPI(`/parcels/${form.id}/presentLocation`, { method: 'put', body })
        .then((res) => {
          const { data } = res;
          if (res.message) {
            parcelPresentLocation = form.present_location;
            parcelStatus = form.status;
            status.setAttribute('disabled', true);
            presentLocation.setAttribute('disabled', true);
            errorMessage.textContent = res.message;
            errorMessage.style.color = 'green';
            const title = res.message || 'Parcel location updated';
            const body = `
              <p class="capitalize" style="font-size: 1rem; line-height: 2rem;">
                <b>Status</b>: ${form.status}<br>
                <b>Current Location</b>: ${form.present_location}<br>
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
      const { id, value } = e.target;
      form[id] = value;
      // toggle status disabled attribute
      if (id === 'status') {
        parcelStatus === value
        ? submitStatus.setAttribute('disabled', true)
        : submitStatus.removeAttribute('disabled'); 
      }
      // toggle pressent_location disabled attribute
      if (id === 'present_location') {
        parcelPresentLocation === value
        ? submitLocation.setAttribute('disabled', true)
        : submitLocation.removeAttribute('disabled'); 
      }
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
      map.after_render(form.from_district, form.present_location || form.to_district);
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
 