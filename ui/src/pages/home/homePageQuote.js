import googleMap from '../../components/googleMap.js';

const quote = {
  render: async () => `
    <div class="container">
        ${await googleMap.render()}
        <div class="box quote-container">
          <h2 class="quote-title">Get A Quote</h2>
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
          </form>
        </div>
      </div>
    `,
    after_render: async () => {
      await googleMap.after_render();
    },
}

export default quote;
