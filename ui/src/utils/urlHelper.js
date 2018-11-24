const urlHelper = { 
  
  extractRequestURL : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
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

export default urlHelper;
