import provinces from '../../utils/store.js';

const Page = {
  render : async () => `
    <div class="container">
      <div class="row content-center">
        <div class="col-4">
          <div class="box signup-container">
            <p class="align-center">
              <img class="brand-title" src="./images/logo-blue.png" alt="logo">
            </p>
            <form action="#">
              <input type="text" name="firstName" id="firstName" placeholder="First Name">
              <div class="form-error first_name"></div>

              <input type="text" name="lastName" id="lastName" placeholder="Last Name">
              <div class="form-error last_name"></div>
            
              <input type="text" name="email" id="email" placeholder="Email">
              <div class="form-error email"></div>

              <input type="password" name="password" id="password" placeholder="Password">
              <div class="form-error password"></div>

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
    // List of povinces and districts of Rwanda
    
    // Initialise select inputs
    const firstName = document.querySelector('#first_name');
    const firstNameError = document.querySelector('.form-error.first_name');

    const lastName = document.querySelector('#last_name');
    const lastNameError = document.querySelector('.form-error.last_name');

    const province = document.querySelector('#province');
    const provinceError = document.querySelector('.form-error.province');

    const district = document.querySelector('#district');
    const districtError = document.querySelector('.form-error.district');

    const email = document.querySelector('#email');
    const emailError = document.querySelector('.form-error.email');

    const password = document.querySelector('#password');
    const passwordError = document.querySelector('.form-error.password');

    const submitSignup = document.querySelector('#submit-signup');
  
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

    submitSignup.addEventListener('click', (e) => {
      e.preventDefault();
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

      if (!form.province) {
        provinceError.style.color = 'red';
        provinceError.textContent = 'Province Required.';
        hasError = true;
      }

      if (!form.first_name) {
        firstNameError.style.color = 'red';
        firstNameError.textContent = 'First Name Required.';
        hasError = true;
      }
  
      if (hasError) {
        return;
      }
      location.href = '/#/profile';
    })
  }
 }
 
 export default Page;
 