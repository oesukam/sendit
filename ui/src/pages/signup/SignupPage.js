import { provinces } from '../../mocks/index.js';
import fetchAPI from '../../utils/fetchAPI.js';
import store from '../../utils/store.js'

const Page = {
  render : async () => `
    <div class="container">
      <div class="row content-center">
        <div class="col-4">
          <div class="box signup-container">
            <p class="align-center">
              <img class="brand-title" src="./images/logo-blue.png" alt="logo">
            </p>
            <div class="form-error error-message"></div>
            <form action="#">
              <input type="text" name="first_name" id="first_name" placeholder="First Name">
              <div class="form-error first_name"></div>

              <input type="text" name="last_name" id="last_name" placeholder="Last Name">
              <div class="form-error last_name"></div>
            
              <input type="text" name="email" id="email" placeholder="Email">
              <div class="form-error email"></div>

              <input type="password" name="password" id="password" placeholder="Password">
              <div class="form-error password"></div>

              <span class="custom-dropdown">
                <select id="gender" name="gender">
                  <option value="">Select Gender</option> 
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </span>
              <div class="form-error gender"></div>

              <span class="custom-dropdown">
                <select id="province" name="province">
                  <option value="">Select Province</option> 
                  <option value="eastern">Eastern Province</option>
                  <option value="kigali">Kigali</option>  
                  <option value="northern">Northen Province</option>
                  <option value="southern">Southern Province</option>
                </select>
              </span>
              <div class="form-error province"></div>
              
              <span class="custom-dropdown">
                <select id="district" name="district">    
                  <option value="">Select District</option>
                </select>
              </span>
              <div class="form-error district"></div>

              <button id="submit-signup" class="btn primary v-wide">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  after_render: async () => {
    let form = {
      first_name: '',
      last_name: '',
      province: '',
      district: '',
      email: '',
      password: '',
    }
    const formKeys = Object.keys(form);
    // List of povinces and districts of Rwanda
    const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Initialise select inputs
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

    const email = document.querySelector('#email');
    const emailError = document.querySelector('.form-error.email');

    const password = document.querySelector('#password');
    const passwordError = document.querySelector('.form-error.password');

    const submitSignup = document.querySelector('#submit-signup');
    const errorMessage = document.querySelector('.form-error.error-message');
    const loading = document.querySelector('.loading');
 
   

    email.addEventListener('input', inputHandler);
    password.addEventListener('input', inputHandler);
    firstName.addEventListener('input', inputHandler);
    lastName.addEventListener('input', inputHandler);
    province.addEventListener('input', inputHandler);
    district.addEventListener('input', inputHandler);

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

    submitSignup.addEventListener('click', (e) => {
      e.preventDefault();
      loading.classList.add('active');
      errorMessage.textContent = ''
      let hasError = false;
      // Reset form errors to empty string
      emailError.textContent = '';
      passwordError.textContent = '';
  
      // Validate email
      if (!form.email) {
        emailError.style.color = 'red';
        emailError.textContent = 'Email Required.';
        hasError = true;
      }
      if (!testEmail.test(form.email)) {
        emailError.style.color = 'red';
        emailError.textContent = 'Enter a correct email.';
        hasError = true;
      }
  
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
 
      if (!form.gender) {
        genderError.style.color = 'red';
        genderError.textContent = 'Gender Required.';
        hasError = true;
      }

      if (hasError) {
        setTimeout(() => loading.classList.remove('active'), 2000);
        return;
      }

      fetchAPI('/auth/signup', { method: 'post', body: form })
        .then((res) => {
          const { success, data, token } = res;
          if (res.message) {
            errorMessage.textContent = res.message;
          }
          if (success && token) {
            localStorage.setItem('token', token);
            store.updateUser(data);
            store.auth = true;
            store.token = token;
            store.user = { ...data };
            // Wait for a second
            setTimeout(() => {
              location.href = '/';
            }, 1000);
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
          }
        })
    })
    // Callback function to handle email and password imput
    function inputHandler (e) {
      form[e.target.id] = e.target.value;
    }
    // Validation handlers
    function validateInputs () {
      const keys = Object.keys(form);
      let hasError = false;
      keys.forEach(key => {
        if (!form[key] && form[key] !== 0) {
          document.querySelector(`#${key}`).textContent = 'Required';
          console.log(document.querySelector(`.form-error.${key}`), key)
          hasError = true;
        }
      });
      loading.classList.remove('active');
      return hasError;
    }
  }
 }
 
 export default Page;
 