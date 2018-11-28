
import sideBar from '../../components/leftSideBar.js';
import store from '../../utils/store.js'

const Page = {
  render : async () => {
    const view = `
      <div class="container">
        <div class="row">
          <div class="col-3">
            ${await sideBar.render()}
          </div>
          <div class="col-9">
            <div class="row mt-5">
              <div class="col-4">
                <div class="box profile-counter">
                  <p>Total Order: <strong>20</strong></p>
                </div>
              </div>
              <div class="col-4">
                <div class="box profile-counter">
                  <p><i class="fa fa-tick"></i> Deliverd: <strong>13</strong></p>
                </div>
              </div>
              <div class="col-4">
                <div class="box profile-counter">
                  <p><i class="fa fa-truck"></i> In Process: <strong>7</strong></p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th width="20" >No.</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Receiver</th>
                      <th>Address</th>
                      <th width="100">Date</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Kigali</td>
                      <td>Gisenyi</td>
                      <td>Franck</td>
                      <td>.....</td>
                      <td>2018-09-2</td>
                      <td>Await pick up</td>
                      <td class="align-right">
                        <a href="order.html" class="btn-edit">
                          <i class="fa fa-edit"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Kigali</td>
                      <td>Gisenyi</td>
                      <td>Anais</td>
                      <td>.....</td>
                      <td>2018-09-3</td>
                      <td>Delivered</td>
                      <td class="align-right">
                        <a href="order.html" class="btn-edit">
                          <i class="fa fa-edit"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Kigali</td>
                      <td>Gisenyi</td>
                      <td>Angel</td>
                      <td>.....</td>
                      <td>2018-09-3</td>
                      <td>In Process</td>
                      <td class="align-right">
                        <a href="order.html" class="btn-edit">
                          <i class="fa fa-edit"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav class="pagination">
                  <a href="#"><i class="fa fa-angle-left"></i> Previous</a>
                  <a href="#">Next <i class="fa fa-angle-right"></i></a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return view;
  },
  after_render: async () => { }
 }
 
 export default Page;
 