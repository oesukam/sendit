const navigation = { 
  extractRequestURL : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    if (url.length > 2) {
      url = url.substring(1);
    }
    let params = url.split('/')
    return params;
  },
  extractQuery: function () {
    const queries = this.extractRequestURL()[this.extractRequestURL().length - 1].match(/\?.*/g, '') || []
    const query = (queries.length > 0 ? queries[0] : '').substring(1);
    let params = query.match(/(([a-zA-Z]+=[a-zA-Z0-9]+&)|([a-zA-Z]+=[a-zA-Z0-9]+))/g) || [];
    let obj = {}
    params.forEach(val => {
      const key = val.match(/[a-zA-Z]+=/g)[0];
      const value = val.match(/=[a-zA-Z0-9]+/g)[0].replace(/&/g, '');
      if (key) {
        obj[key.substring(0, key.length-1)] = value.substring(1);
      }
    })
    return obj;
  }
  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  , sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default navigation;
