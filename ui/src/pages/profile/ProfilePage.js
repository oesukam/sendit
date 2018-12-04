
import sideBar from '../../components/leftSideBar.js';
import store from '../../utils/store.js';
import fetchAPI from '../../utils/fetchAPI.js';

const Page = {
  render : async () => {
    const { user = '' } = store;
    let parcels = { data: [], page: 1, total: 0}
    let counters = { delivered: 0, in_progress: 0 }
    if (user.id) {
      const parcelsData = await fetchAPI(`/users/${user.id}/parcels`) || parcels;
      parcels = parcels.data ? parcelsData : parcels;
      const result = await fetchAPI(`/users/${user.id}/counters`);
      counters = result.counters || counters;
    }
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
                  <p>Total Order: <strong>${(counters.delivered + counters.in_progress) || 0}</strong></p>
                </div>
              </div>
              <div class="col-4">
                <div class="box profile-counter">
                  <p><i class="fa fa-tick"></i> Delivered: <strong>${counters.delivered || 0}</strong></p>
                </div>
              </div>
              <div class="col-4">
                <div class="box profile-counter">
                  <p><i class="fa fa-truck"></i> In Process: <strong>${counters.in_progress || 0}</strong></p>
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
                      <th width="140">Receiver</th>
                      <th width="110">Date</th>
                      <th width="100">Status</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ parcels.data.map((val, index) => {
                      return `
                        <tr class="capitalize">
                          <td>${index+1}</td>
                          <td>${val.from_province}, ${val.from_district}</td>
                          <td>${val.to_province}, ${val.to_district}</td>
                          <td>${val.receiver_names}</td>
                          <td>${val.created_at.substring(0, 10)}</td>
                          <td>${val.status}</td>
                          <td class="align-right">
                            <a href="/#/parcels/${val.id}" class="btn-edit">
                              <i class="fa fa-edit"></i>
                            </a>
                          </td>
                        </tr>
                        `;
                      }).join('\n ')
                    }
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
  after_render: async () => {
    
  }
 }
 
 export default Page;
 