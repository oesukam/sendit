// let onNavItemClick = (pathName) => {
//   window.history.pushState(
//     {}, 
//     pathName,
//     window.location.origin + pathName
//   );
//   contentDiv.innerHTML = routes[pathName];
// }

const navigation = { 
  extractRequestURL : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    if (url.length > 2) {
      url = url.substring(1);
    }
    let params = url.split('/')
    return params;
  }
  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  , sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default navigation;
