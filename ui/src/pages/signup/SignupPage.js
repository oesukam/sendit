import provinces from '../../utils/store';

const Page = {
  render : async () => `
    <div class="container">
      <div class="row content-center">
        <div class="col-6">
          <div class="box signup-container">
            <h3 class="title primary align-center">Register</h3>
            <form action="#">
              <label for="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName">
              <div class="form-error firstName"></div>

              <label for="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName">
              <div class="form-error lastName"></div>
            
              <label for="province">Province</label>
              <span class="custom-dropdown">
                <select id="province" name="province">
                  <option value="">Select</option> 
                  <option value="eastern">Eastern Province</option>
                  <option value="kigali">Kigali</option>  
                  <option value="northern">Northen Province</option>
                  <option value="southern">Southern Province</option>
                </select>
              </span>
              <div class="form-error province"></div>
              
              <label for="district">District</label>
              <span class="custom-dropdown">
                <select id="district" name="district">    
                  <option value="eastern">Select</option>
                </select>
              </span>
              <div class="form-error district"></div>

              <label for="email">Email</label>
              <input type="text" name="email" id="email">
              <div class="form-error email"></div>

              <label for="password">Password</label>
              <input type="password" name="password" id="password">
              <div class="form-error password"></div>

              <label for="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword">
              <div class="form-error confirmPassword"></div>

              <button class="btn primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  after_render: async () => {
    let form = {
      firstName: '',
      lastName: '',
      province: '',
      district: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    // List of provinces and districts of Rwanda
    
    // Initialise select inputs
    const province = document.querySelector('#province');
    const district = document.querySelector('#district');
  
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
  }
 }
 
 export default Page;
 