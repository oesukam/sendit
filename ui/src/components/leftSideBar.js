import store from '../utils/store.js';

const sideBar = {
  render: async () => {
    const { user } = store;
    const links = [
      { link: '/#/', text: 'Home' },
      { link: '/#/quote', text: 'Get Quote' },
      { link: `/#/profile/${user.id}`, text: 'My Account' },
      { link: '/#/my_parcels', text: 'My Parcels' },
      { link: '/#/create_parcel', text: 'Add parcel' },
      { link: '/#/admin_parcels', text: 'Parcels' },
    ]
    const view = `
      <div class="box sidebar">
        <div class="sidebar__header">
          <div
            class="profile-avatar"
            style="background-image: url('${store.user? store.user.avatar_url || '/images/profile-female.png': '/images/profile-female.png' }'), linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
            >
            
          </div>
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
              if (
                el.auth
                ? 
                  store.auth 
                  && (el.users ? el.users.indexOf(user.user_type) !== -1 : true)
                  && !el.hide
                : 
                  !store.auth || !el.hide
              ) {
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
