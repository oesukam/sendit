import store from '../utils/store.js';

const topNav = {
  render: async () => {
    
    const links = [
      { link: '/', text: 'Home' },
      { link: '/#/quote', text: 'Get Quote' },
      { link: '#', text: `Admin`, auth: true, user: 'admin' },
      { link: '/#/signup', text: 'Signup' },
      { link: '/#/login', text: 'Login' },
      { link: '/#/profile/:id', text: '<i class="fa fa-user mr-5"></i> My Account', auth: true },
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
              if (el.auth ? store.auth : true) {
                return `
                  <li class="nav-item">
                    <a href="${el.link}">${el.text}</a>
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
    })
  }
}

export default topNav;