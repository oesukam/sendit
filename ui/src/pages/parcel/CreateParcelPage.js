
import sideBar from '../../components/leftSideBar.js';
import map from '../../components/googleMap.js';

const Page = {
  render : async () => `
    <div class="container">
      <div class="row">
        <div class="col-3">
          ${await sideBar.render()}
        </div>
        <div class="col-9">
          ${await map.render()}
          <div class="box order-container">
            <h2 class="title-1 is-white align-center">Create a parcel</h3>
            <p class="quote-error">
              Please select the corresponding province and district.
            </p>
            <form action="#">
              <div class="row">
                <div class="col-6">
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
                <div class="col-6">
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
              </div>

              <div class="row">
                <div class="col-6">
                  <label for="weight" class="title is-white">Weight</label>
                  <input type="number" name="weight" id="weight">
                  <div class="form-error weight"></div>
                </div>
                <div class="col-6">
                  <label for="phone" class="title is-white">Phone Number</label>
                  <input type="number" name="phone" id="phone">
                  <div class="form-error phone"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <label for="receiverNames" class="title is-white">Receiver's Names</label>
                  <input type="text" name="receiverNames" id="receiverNames">
                  <div class="form-error receiverNames"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <label for="address" class="title is-white">Address</label>
                  <textarea
                    placeholder="Enter full address"
                    rows="5"
                    name="address"
                    id="address"
                    maxlength="200"
                    ></textarea>
                  <div class="form-error address"></div>

                  <button id="submit-quote" class="btn">Submit</button>

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
      </div>
    </div>
  `,
  after_render: async () => { }
 }
 
 export default Page;
 