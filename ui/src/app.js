/*
 * SPA structure inspired by Bryan Manuele (Fermi Dirak)
 * https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573
 */

// 'use strict';
// Web Pages
import Error404Page from './pages/error/Error404Page.js';
import HomePage from './pages/home/HomePage.js';
import QuotePage from './pages/quote/QuotePage.js';
import LoginPage from './pages/login/LoginPage.js';
import SignupPage from './pages/signup/SignupPage.js';
import ProfilePage from './pages/profile/ProfilePage.js';
import ConfirmEmailPage from './pages/profile/ConfirmEmailPage.js';
import MyParcelsPage from './pages/parcel/MyParcelsPage.js'
import CreateParcelPage from './pages/parcel/CreateParcelPage.js'
import UpdateParcelPage from './pages/parcel/UpdateParcelPage.js'
import AdminParcelsPage from './pages/admin/AdminParcelsPage.js';
import AdminParcelPage from './pages/admin/AdminParcelPage.js';

// Components
import topHeader from './components/topHeader.js';
import bottomFooter from './components/bottomFooter.js';
import navigation from './utils/navigation.js';

const header = document.getElementById('top-menu');
const mainContent = document.getElementById('main-content');
const footer = document.getElementById('footer');

const loadingPage = document.querySelector('.loading');

import store from './utils/store.js';

// Pages routes
const routes = {
  '/': {
    name: 'Home',
    page: HomePage
  },
  '/quote': {
    name: 'Get Quote',
    page: QuotePage,
  },
  '/login': {
    name: 'Login',
    page: LoginPage,
    hide: true,
  },
  '/signup': {
    name: 'Signup',
    page: SignupPage,
    hide: true,
  },
  '/my_parcels': {
    name: 'My Parcels',
    page: MyParcelsPage,
    auth: true,
  },
  '/create_parcel': {
    name: 'Create a parcel',
    page: CreateParcelPage,
    auth: true,
  },
  '/parcels/:id': {
    name: 'Update parcel',
    page: UpdateParcelPage,
    auth: true,
  },
  '/profile/:id': {
    name: 'Profile',
    page: ProfilePage,
    auth: true,
  },
  '/profile/:id/confirm_email/:id': {
    name: 'Confirm Email',
    page: ConfirmEmailPage,
  },
  '/admin_parcels': {
    name: 'Admin Parcels',
    page: AdminParcelsPage,
    auth: true,
  },
  '/admin_parcels/:id': {
    name: 'Admin Parcels',
    page: AdminParcelPage,
    auth: true,
  }
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  let request = navigation.extractRequestURL();
  let parsedURL = [];
  let paramIndex = 1;
  request.forEach((el, index) => {
    let param = el;
    if (param) {
      if (param.match(/\?.*/)) {
        param = param.replace(/\?.*/g, '');
      }
      if (param) {
        if (index%2 !== 0 && index != 0) {
          parsedURL.push(`:id`);
          paramIndex += 1;
        } else {
          parsedURL.push(param);
        }
      }
    }
  });

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const urls = Object.keys(routes);
  let url = urls.find(route => {
    let routeParams = route.split('/');
    routeParams.shift()
    const requestParams = parsedURL;
    const paramRegx = /:id/;
    if (routeParams.length === requestParams.length) {
      for (let i = 0; i < routeParams.length; i+=1) {
        if (
          routeParams[i] !== requestParams[i]
          && !paramRegx.test(routeParams[i])
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  })

  if (parsedURL.length === 0) url = '/';

  // Check if the route is protected
  if (routes[url]) {
    if (routes[url].auth || store.auth) {
      if (routes[url].hide || !store.auth) {
        url = '/';
      }
    }
  }
  let page = routes[url] ? routes[url].page : Error404Page

  loadingPage.classList.add('active');
  // Render the Header and footer of the page
  header.innerHTML = await topHeader.render();
  await topHeader.after_render();

  // Render content
  mainContent.innerHTML = await page.render();
  const menuLink = document.querySelecter
  await page.after_render();

  // Render footer
  footer.innerHTML = await bottomFooter.render();
  await bottomFooter.after_render();
  
  // Wait for a second to remove the loading spinner
  setTimeout(() => {
    loadingPage.classList.remove('active'); 
  }, 1000)
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

// window.onpopstate = () => {
//   mainContent.innerHTML = routes[window.location.pathname];
// }
