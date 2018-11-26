import map from '../../components/googleMap.js';
import provinces from '../../utils/store';

const Page = {
 render : async () => `
    <div class="container">
    ${await map.render()}
    <div class="box quote-container">
      <p class="quote-error">
        Please select the corresponding province and district.
      </p>
      <form action="#">
        <div class="row">
          <div class="col-4">
            <h3 class="title is-white">From</h3>

            <label for="fromProvince">Province</label>
            <span class="custom-dropdown">
              <select id="fromProvince" name="fromProvince">
                <option value="">Select</option> 
                <option value="eastern">Eastern Province</option>
                <option value="kigali">Kigali</option>  
                <option value="northern">Northen Province</option>
                <option value="southern">Southern Province</option>
              </select>
            </span>
            
            <label for="fromDistrict">District</label>
            <span class="custom-dropdown">
              <select id="fromDistrict" name="fromDistrict">    
                <option value="eastern">Select</option>
              </select>
            </span>
          </div>
          <div class="col-4">
            <h3 class="title is-white">To</h3>
            
            <label for="toProvince">Province</label>
            <span class="custom-dropdown">
              <select id="toProvince" name="toProvince">
                <option value="">Select</option> 
                <option value="eastern">Eastern Province</option>
                <option value="kigali">Kigali</option>  
                <option value="northern">Northen Province</option>
                <option value="southern">Southern Province</option>
              </select>
            </span>
            
            <label for="toDistrict">District</label>
            <span class="custom-dropdown">
              <select id="toDistrict" name="toDistrict">    
                <option value="eastern">Select</option>
              </select>
            </span>
          </div>
          <div class="col-4">
            <label for="from" class="title is-white">Weight</label>
            <input type="number" name="weight" id="weight-input">
            <div class="form-error"></div>
            <button id="submit-quote" class="btn">Quote</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="quote-result">
              <p>From <strong>Kigali</strong> to <strong>Gisenyi</strong>, a parcel of 
                <strong>5Kg</strong> costs <strong>2$</strong>
              </p>
            </div>
          </div>
        </div>
      </form>
      
    </div>
    </div>
 `,
 after_render: async () => {
  const ids = {
    fromProvince: 'fromDistrict',
    toProvince: 'toDistrict'
  }
  let form = {
    fromProvince: '',
    fromDistrict: '',
    toProvince: '',
    toDistrict: '',
    weight: '',
  };
   // Initialise select inputs and errors
  const fromProvince = document.querySelector('#fromProvince');
  const toProvince = document.querySelector('#toProvince');
  const quoteError = document.querySelector('.quote-error');

  // const toDistrict = document.querySelector('#toDistrict');

  fromProvince.addEventListener('change', provinceCallBack);
  toProvince.addEventListener('change', provinceCallBack);

  // district.addEventListener('change', (e) => {
  //   form.district = e.target.value
  // });

  function provinceCallBack(e) {
    const value = e.target.value;
    const id =  e.target.id; 
    // Dynamic selection of District option element based on Province event selection
    const district = document.querySelector(`#${ids[id]}`);
    console.log('district', value, id, ids[value])
    if (value && district) {
      console.log()
      form.province = value;
      const districts = provinces[value].districts || []
      district.options.length = 0; //Reset district option to 0
      district.options[0] = new Option('Select'); // Add the first option to district

      // Add all district from the selected province
      for(let index in districts) {
        district.add(new Option(districts[index].name, index));
      };
    }
  }

  const submitQute = document.querySelector('#submit-quote');
  submitQute.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.fromDistrict && form.toDistrict && form.weight) {
      quoteError.classList.remove('active');
    } else {
      quoteError.classList.add('active');
    }
  });
 }
}

export default Page;