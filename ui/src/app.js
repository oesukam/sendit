/*
 * SPA structure inspired by Bryan Manuele (Fermi Dirak)
 * https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573
 */

'use strict';
// Web Pages
import Error404Page from './pages/error/Error404Page.js';
import HomePage from './pages/home/HomePage.js';
import QuotePage from './pages/quote/QuotePage.js';
import LoginPage from './pages/login/LoginPage.js';
import SignupPage from './pages/signup/SignupPage.js';
import ProfilePage from './pages/profile/ProfilePage.js';
import CreateParcelPage from './pages/parcel/CreateParcelPage.js'
import AdminParcelsPage from './pages/admin/AdminParcelsPage.js';
import AdminParcelPage from './pages/admin/AdminParcelPage.js';

// Components
import topHeader from './components/topHeader.js';
import bottomFooter from './components/bottomFooter.js';
import navigation from './utils/navigation.js';

const header = document.getElementById('top-menu');
const mainContent = document.getElementById('main-content');
const footer = document.getElementById('footer');

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
  },
  '/signup': {
    name: 'Signup',
    page: SignupPage,
  },
  '/create_parcel': {
    name: 'Create a parcel',
    page: CreateParcelPage,
  },
  '/profile/:id': {
    name: 'Profile',
    page: ProfilePage,
  },
  '/profile/:id/parcels': {
    name: 'My Parcels',
    page: ProfilePage,
  },
  '/admin/parcels': {
    name: 'Admin Parcels',
    page: AdminParcelsPage,
  },
  '/admin/parcels/:id': {
    name: 'Admin Parcels',
    page: AdminParcelPage,
  }
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Render the Header and footer of the page
  header.innerHTML = await topHeader.render();
  await topHeader.after_render();
  footer.innerHTML = await bottomFooter.render();
  await bottomFooter.after_render();

  let request = navigation.extractRequestURL()
  let parsedURL = [];
  let paramIndex = 1;
  request.forEach((el, index) => {
    if (el) {
      if (el) {
        if (index%2 === 0 && index != 0) {
          parsedURL.push(`:id`);
          paramIndex += 1;
        } else {
          parsedURL.push(el);
        }
      }
    }
  });

  
  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const urls = Object.keys(routes);
  let url = urls.find(route => {
    const routeParams = route.split('/');
    console.log(routeParams.shift())
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

  let page = routes[url] ? routes[url].page : Error404Page
  mainContent.innerHTML = await page.render();
  const menuLink = document.querySelecter
  await page.after_render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

// window.onpopstate = () => {
//   mainContent.innerHTML = routes[window.location.pathname];
// }