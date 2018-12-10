
import sideBar from '../../components/leftSideBar.js';
import map from '../../components/googleMap.js';
import { provinces } from '../../mocks/index.js';
import fetchAPI from '../../utils/fetchAPI.js';
import model from '../../utils/model.js';
import getPrice from '../../utils/getPrice.js';
import navigation from '../../utils/navigation.js';
import store from '../../utils/store.js'

let form = { ...store.user };
const Page = {
  render : async () => {
    const id = navigation.extractRequestURL()[1];
    await fetchAPI(`/users/${id}`)
      .then(res => {
        form = res.data;
        store.updateUser(res.data);
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
              <h2 class="title-1 align-center">My Account</h3>
              <div class="form-error error-message"></div>
              <form action="#">
                <div class="row">
                  <div class="col-12 align-center">
                    <div
                      class="profile-avatar user"
                      style="background-image: url('${form.avatar_url || '/images/profile-female.png'}'), linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
                    >
                      <div class="profile-avatar__edit">
                        <i class="fa fa-pencil"></i>
                      </div>
                      <input type="file" hidden name="avatar" id="avatar" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <label for="province">Province</label>
                    <span class="custom-dropdown" >
                      <select
                        class="capitalize"
                        id="province"
                        name="province
                        required
                        placeholder="Province"
                      >
                        <option ${form.province === 'eastern' ? 'selected' : ''} value="eastern">
                          Eastern Province
                        </option>
                        <option ${form.province === 'kigali' ? 'selected' : ''} value="kigali">
                          Kigali
                        </option>  
                        <option ${form.province === 'northern' ? 'selected' : ''} value="northern">
                          Northen Province
                        </option>
                        <option ${form.province === 'southern' ? 'selected' : ''} value="southern">
                          Southern Province
                        </option>
                      </select>
                    </span>
                    <div class="form-error province"></div>
                  </div>
                  <div class="col-6">
                    <label for="district">District</label>
                    <span class="custom-dropdown">
                      <select class="capitalize" id="district" name="district" required>    
                        <option value="">${form.district}</option>
                      </select>
                    </span>
                    <div class="form-error district"></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <label for="first_name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="First Name"
                      required
                      value="${form.first_name}"
                    >
                    <div class="form-error first_name"></div>
                  </div>
                  <div class="col-6">
                    <label for="last_name">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="First Name"
                      required
                      value="${form.last_name}"
                    >
                    <div class="form-error last_name"></div>
                  </div>
                  <div class="col-6">
                    <label for="gender">Gender</label>
                    <span class="custom-dropdown">
                      <select id="gender" name="gender" disabled>
                        <option value="">Select Gender</option> 
                        <option value="Male" ${form.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${form.gender === 'Female' ? 'selected' : ''}>Female</option>
                      </select>
                    </span>
                <div class="form-error gender"></div>
                  </div>
                  <div class="col-6">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value="${form.email}"
                      disabled
                    >
                    <div class="form-error email"></div>
                  </div>
                  <div class="col-6">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password">
                    <div class="form-error password"></div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <label for="address">Address</label>
                    <textarea
                      placeholder="Enter full address"
                      rows="5"
                      name="address"
                      id="address"
                      maxlength="200"
                      required
                      ></textarea>
                    <div class="form-error address"></div>

                    <button
                      id="submit-form"
                      class="btn primary"
                    >
                      Update
                    </button>
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
    // Initialise select inputs
    const avatar = document.getElementById('avatar');
    const profileAvatar = document.querySelector('.profile-avatar.user')
    const avatarButton = document.querySelector('.profile-avatar__edit')
    const firstName = document.querySelector('#first_name');
    const firstNameError = document.querySelector('.form-error.first_name');

    const lastName = document.querySelector('#last_name');
    const lastNameError = document.querySelector('.form-error.last_name');

    const province = document.querySelector('#province');
    const provinceError = document.querySelector('.form-error.province');

    const district = document.querySelector('#district');
    const districtError = document.querySelector('.form-error.district');

    const gender = document.querySelector('#gender');
    const genderError = document.querySelector('.form-error.gender');


    const password = document.querySelector('#password');
    const passwordError = document.querySelector('.form-error.password');

    const submitForm = document.querySelector('#submit-form');
    const errorMessage = document.querySelector('.form-error.error-message');
    const loading = document.querySelector('.loading');
 
   

    password.addEventListener('input', inputHandler);
    firstName.addEventListener('input', inputHandler);
    lastName.addEventListener('input', inputHandler);
    province.addEventListener('input', inputHandler);
    district.addEventListener('input', inputHandler);

    avatarButton.addEventListener('click', () => {
      console.log('dofpfo');
      avatar.click();
    });
    avatar.addEventListener("change", (e) => {
      if (avatar.files.length > 0) {
        loading.classList.add('active');

        let formData = new FormData();
        formData.append('avatar', avatar.files[0])
        fetchAPI(
          `/users/${form.id}/avatar`,
          { method: 'PUT', body: formData },
          true,
        )
        .then(( res ) => {
          if (res.success) {
            form.avatar_url = res.avatar_url;
            profileAvatar.style.backgroundImage =`
              url("${form.avatar_url}"), linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))
            `;
            store.user = {
              ...store.user,
              avatar_url: form.avatar_url, 
            }
            store.updateUser(store.user);
          }
          setTimeout(() => {
            loading.classList.remove('active');
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            loading.classList.remove('active');
          }, 2000);
        })

        
      }
    });
    province.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value) {
        form.province = value;
        const districts = provinces[value].districts || []
  
        district.options.length = 0; //Reset district option to 0
        district.options[0] = new Option('Select'); // Add the first option to district
  
        // Add all district from the selected province
        for(let index in districts) {
          district.add(new Option(districts[index].name, index));
        };
      }
    });
  
    district.addEventListener('change', (e) => {
      form.district = e.target.value
    });

    gender.addEventListener('change', (e) => {
      form.gender = e.target.value
    });

    submitForm.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      errorMessage.textContent = ''
      let hasError = false;
      // Reset form errors to empty string
      passwordError.textContent = '';
  
  
      // Validate password
      if (!form.password) {
        passwordError.style.color = 'red';
        passwordError.textContent = 'Password Required.';
        hasError = true;
      }

      if (form.password && form.password.length < 6) {
        passwordError.style.color = 'red';
        passwordError.textContent = 'Password must be at least 6 characters.';
        hasError = true;
      }

      if (!form.province) {
        provinceError.style.color = 'red';
        provinceError.textContent = 'Province Required.';
        hasError = true;
      }

      if (!form.district) {
        districtError.style.color = 'red';
        districtError.textContent = 'District Required.';
        hasError = true;
      }

      if (!form.first_name) {
        firstNameError.style.color = 'red';
        firstNameError.textContent = 'First Name Required.';
        hasError = true;
      }

      if (!form.last_name) {
        lastNameError.style.color = 'red';
        lastNameError.textContent = 'Last Name Required.';
        hasError = true;
      }
 

      if (hasError) {
        setTimeout(() => loading.classList.remove('active'), 2000);
        return;
      }

      const formData = {
        first_name: form.first_name,
        last_name: form.last_name,
        province: form.province,
        district: form.district,
        address: form.address,
        password: form.password,
      }

      fetchAPI(`/users/${form.id}`, { method: 'PUT', body: { ...formData } })
        .then((res) => {
          const { success, data } = res;
          if (res.message) {
            errorMessage.textContent = res.message;
            model({
              title: res.message,
            });
          }
          if (success) {
            store.user = { ...data };
            store.updateUser(data);
            const title = res.message || 'Information updated';
            const body = `
              <p class="capitalize" style="font-size: 1rem; line-height: 2rem;">
                <b>Province</b>: ${form.province}<br>
                <b>District</b>: ${form.district}<br>
                <b>Gender</b>: ${form.gender}<br>
                <b>Names</b>: ${form.first_names} ${form.last_names}<br>
                <b>Address</b>: ${form.address}<br>
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
          if (err.message) {
            errorMessage.textContent = err.message;
            model({
              title: err.message,
            });
          }
        })
    })
    function validateInputs (entries) {
      const keys = Object.keys(entries);
      let hasError = false;
      keys.forEach(key => {
        if (!entries[key] && entries[key] !== 0) {
          const tagElement = document.querySelector(`.form-error.${key}`);
          if (tagElement) {
            tagElement.textContent = 'Required';
            tagElement.style.color = 'red'
            hasError = true;
          }
        }      });
      return hasError;
    }

    // Callback function to handle email and password imput
    function inputHandler (e) {
      form[e.target.id] = e.target.value;
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
 