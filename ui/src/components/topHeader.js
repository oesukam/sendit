import store from '../utils/store.js'
const topNav = {
  render: async () => {
    const { user } = store;
    const links = [
      { link: '/', text: 'Home', users: [] },
      { link: '/#/quote', text: 'Get Quote', users: [] },
      { link: '#', text: `Admin`, auth: true, users: ['admin'] },
      { link: '/#/signup', text: 'Signup', hide: true },
      { link: '/#/login', text: 'Login', hide: true },
      {
        link: `/#/profile/${user.id ? user.id : ':id'}`,
        text: '<i class="fa fa-user mr-5"></i> My Account',
        auth: true,
      },
      {
        link: '#',
        text: '<i class="fa fa-sign-out mr-5"></i> Logout',
        auth: true,
        attr: 'onclick="logout()"',
        classes: 'logout'
      },
    ]
    const view = `
      <div class="meu-header">
        <div class="container">
          <div class="col-8">
            <ul class="plain-list">
              <li><a href="#"><i class="fa fa-phone"></i> (+250)-000-000-000</a></li>
              <li><a href="#"><i class="fa fa-envelope"></i> info@sendit.com</a></li>
            </ul>
          </div>
          <div class="col-4 align-right">
            <ul class="plain-list">
              <li><a href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a href="#"><i class="fa fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <a class="brand" href="index.html">
          <img class="brand__img" src="./images/logo.png" alt="logo">
        </a>
        <div class="toggle-menu is-tablet">
          <div class="hamburger"></div>
        </div>
        <nav id="menu-nav" class="nav pull-right">
          <ul>
            ${links.map(el => {
              if (
                  store.auth
                  ? 
                    store.auth 
                    && (el.users ? el.users.indexOf(store.user.user_type) === -1 : true)
                    && !el.hide
                  : 
                    !el.auth || el.hide
                ) {
                return `
                  <li class="nav-item">
                    <a
                      ${el.attr? el.attr:'kk'} 
                      href="${el.link}" ${el.classes?`class="${el.classes}"`:''}
                    >
                      ${el.text}
                    </a>
                  </li>
                `;
              }
            }).join('\n ')}
          </ul>
        </nav>
      </div>
  `
  return view;
  },
  after_render: async () => {
    const navLinks = document.querySelectorAll('.nav-item>a');
    /*
      Add eventListerner to all menu links in order to toggle
      active one
     */
    navLinks.forEach(el => {
      // Assure to make active the current page when loading
      if (el.href === window.location.href) {
        el.classList.add('active');
      }
      // Adds click event to all menu links
      el.addEventListener('click', (e) => {
        navLinks.forEach(nav => nav.classList.remove('active'))
        e.target.classList.add('active');
      })
    });


    // Add the logout function to the global object window
    window.logout = function (e) {
      store.logout();
      location.href = '/'
    };

  }
}

export default topNav;