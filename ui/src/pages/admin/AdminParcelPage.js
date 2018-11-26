
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
            <h2 class="title-1 align-center">Parcel's details</h3>
            <p class="quote-error">
              Please select the corresponding province and district.
            </p>
            <form action="#">
              <div class="row content-center">
                <div class="col-6 align-center">
                  <label for="orderStatus">Order Status</label>
                  <span class="custom-dropdown">
                    <select id="orderStatus" name="orderStatus">
                      <option value="Waiting Pickup">Waiting Pickup</option>
                      <option value="Pick Up" selected>Pick Up</option>  
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </span>

                  <div class="checkbox-block content-center">
                    <label for="cancelled">Cancelled</label>
                    <input class="checkbox" type="checkbox" name="cancelled" /> 
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <h3 class="title">From</h3>
    
                  <label for="fromProvince">Province</label>
                  <span class="custom-dropdown">
                    <select disabled id="fromProvince" name="fromProvince">
                      <option value="">Select</option> 
                      <option value="eastern">Eastern Province</option>
                      <option value="kigali" selected>Kigali</option>  
                      <option value="northern">Northen Province</option>
                      <option value="southern">Southern Province</option>
                    </select>
                  </span>
                  
                  <label for="fromDistrict">District</label>
                  <span class="custom-dropdown">
                    <select disabled id="fromDistrict" name="fromDistrict">    
                      <option value="eastern">Select</option>
                      <option value="Kigali" selected>Kigali</option>
                    </select>
                  </span>
                </div>
                <div class="col-6">
                  <h3 class="title">To</h3>
                  
                  <label for="toProvince">Province</label>
                  <span class="custom-dropdown">
                    <select id="toProvince" name="toProvince">
                      <option value="">Select</option> 
                      <option value="eastern">Eastern Province</option>
                      <option value="kigali">Kigali</option>  
                      <option value="northern">Northen Province</option>
                      <option value="southern" selected>Southern Province</option>
                    </select>
                  </span>
                  
                  <label for="toDistrict">District</label>
                  <span class="custom-dropdown">
                    <select id="toDistrict" name="toDistrict">    
                      <option value="eastern">Select</option>
                      <option value="Gisenyi" selected>Gisenyi</option>
                    </select>
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <label for="weight" class="title">Weight</label>
                  <input type="number" name="weight" value="5" disabled id="weight">
                  <div class="form-error weight"></div>
                </div>
                <div class="col-6">
                  <label for="phone" class="title">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    disabled id="phone"
                    value="000-0000-000-000"
                  >
                  <div class="form-error phone"></div>
                </div>
              </div>
              
              <div class="row">
                <div class="col-6">
                  <label for="receiverNames" class="title">Receiver's Names</label>
                  <input type="text" name="receiverNames" id="receiverNames">
                  <div class="form-error receiverNames"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <label for="address" class="title">Address</label>
                  <textarea
                    disabled
                    placeholder="Enter full address"
                    rows="5"
                    name="address"
                    id="address"
                    maxlength="200"
                    >Location Address</textarea>
                  <div class="form-error address"></div>

                  <button id="submit-quote" class="btn">Update</button>

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
 