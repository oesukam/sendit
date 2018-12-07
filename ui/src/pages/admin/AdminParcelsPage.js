
import sideBar from '../../components/leftSideBar.js';
import store from '../../utils/store.js';
import fetchAPI from '../../utils/fetchAPI.js';
import nav from '../../utils/navigation.js';

let parcels = { data: [], page: 1, total: 0 };
let counters = { delivered: 0, in_progress: 0 };
let keywords = '';

const Page = {
  render : async () => {
    const { user = '' } = store;
    const { page = 1, search = ''} = nav.extractQuery();
    if (user.id) {
      const parcelsUrl = `/parcels?page=${page}`
      const parcelsData = await fetchAPI(parcelsUrl) || parcels;
      parcels = parcels.data ? parcelsData : parcels;
      const result = await fetchAPI(`/parcels/counters`);
      counters = result.counters || counters;
    }
    const searchForm = `
      <form>
        <div class="input-block is-row search">
          <input id="search-input" type="text" name="search" placeholder="Search for user" >
          <i class="fa fa-search icon-btn"></i>
        </div>
      </form>`;
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
              <h3 class="title-1 align-center">Parcels</h3>
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
                <a
                  ${ 
                    parcels.page > 1
                    ? `href="/#/admin_parcels?page=${parcels.page - 1}"`
                    : ''
                  }
                  ${parcels.page === 1 ? 'disabled' : ''}
                >
                  <i class="fa fa-angle-left"></i> Previous
                </a>
                <a
                  ${ 
                    parcels.page <= parcels.totalPage
                    ? `href="/#/admin_parcels?page=${parcels.page + 1}"`
                    : ''
                  }
                  ${parcels.page >= parcels.totalPage ? 'disabled' : ''}
                >
                  Next <i class="fa fa-angle-right"></i>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>`;
      return view;
  },
  after_render: async () => {
    /*const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        const { page = 1 } = nav.extractQuery();
        location.href = `/#/admin_parcels?page=${page}&search=${keywords}`
      }
    })
    searchInput.addEventListener('keyup', (e) => {
      keywords = e.target.value;
    })*/
  }
 }
 
 export default Page;
 