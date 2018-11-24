'use strict';

import Home         from './pages/home/Home.js'
import Error404     from './pages/error/Error404.js'

import topHeader       from './components/topHeader.js'
import bottomFooter    from './components/bottomFooter.js' 

import urlHelper        from './utils/urlHelper.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Home,
  '/quote': Error404,
};

console.log('osdpfodpfdof');


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    console.log('ospdfodpfo')
    // Lazy load view element:
    const header = null || document.getElementById('top-menu');
    const mainContent = null || document.getElementById('main-content');
    const footer = null || document.getElementById('footer');
    
    // Render the Header and footer of the page
    header.innerHTML = await topHeader.render();
    await topHeader.after_render();
    footer.innerHTML = await bottomFooter.render();
    await bottomFooter.after_render();


    // Get the parsed URl from the addressbar
    let request = urlHelper.extractRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request[0] ? '/' + request[0] : '/') + (request[1] ? '/:id' : '') + (request[2] ? '/' + request[2] : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    mainContent.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
