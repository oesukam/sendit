
import sideBar from '../../components/leftSideBar.js';

const Page = {
  render : async () => `
    <div class="container">
      <div class="row">
        <div class="col-3">
          ${await sideBar.render()}
        </div>
        <div class="col-9">
          <div class="row">
          <div class="col-12">
            <h3 class="title-1 align-center">Parcels</h3>
            <form action="#">
              <div class="input-block is-row search">
                <input type="text" placeholder="Search" >
                <i class="fa fa-search icon-btn"></i>
              </div>
            </form>
            <table class="table">
              <thead>
                <tr>
                  <th width="20" >No.</th>
                  <th>Users</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Address</th>
                  <th width="100">Date</th>
                  <th width="100">Status</th>
                  <th width="100">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Olivier</td>
                  <td>Kigali</td>
                  <td>Gisenyi</td>
                  <td>.....</td>
                  <td>2018-09-2</td>
                  <td>Await pick up</td>
                  <td class="align-right">
                    <a href="order.html" class="btn-edit">
                      <i class="fa fa-edit"></i> Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Andrew</td>
                  <td>Kigali</td>
                  <td>Gisenyi</td>
                  <td>.....</td>
                  <td>2018-09-3</td>
                  <td>Delivered</td>
                  <td class="align-right">
                    <a href="order.html" class="btn-edit">
                      <i class="fa fa-edit"></i> Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Angel</td>
                  <td>Kigali</td>
                  <td>Gisenyi</td>
                  <td>.....</td>
                  <td>2018-09-3</td>
                  <td>In Process</td>
                  <td class="align-right">
                    <a href="order.html" class="btn-edit">
                      <i class="fa fa-edit"></i> Edit
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
  `,
  after_render: async () => { }
 }
 
 export default Page;
 