import store from '../utils/store.js';

const sideBar = {
  render: async () => {
    const { user } = store;
    const links = [
      { link: '/', text: 'Home' },
      { link: '/#/quote', text: 'Get Quote' },
      { link: '#', text: `Admin`, auth: true, user: 'admin' },
      { link: `/#/profile/${user.id}`, text: 'My Parcels' },
      { link: '/#/create_parcel', text: 'Add parcel' },
      // { link: '/#/admin/parcels', text: 'Admin Parcels' },
      // { link: '/#/admin/parcels/:id', text: 'View a parcel' },
    ]
    const view = `
      <div class="box sidebar">
        <div class="sidebar__header">
          <div class="profile-avatar"></div>
          <div class="profile-name">
          ${ 
            store.user
            ? store.user.first_name + ' ' + store.user.last_name
            : 'My Names'
          }
          </div>
        </div>
        <div class="sidebar__content">
          <ul class="sidebar__nav">
            ${links.map(el => {
              if (el.auth ? store.auth : true) {
                return `
                  <li class="nav-item">
                    <a href="${el.link}">${el.text}</a>
                  </li>
                `;
              }
            }).join('\n ')}
          </ul>
        </div>
      </div>
    `
    return view;
  },
  after_render: async () => {}
}

export default sideBar;
