'use strict';

(() => {
  const ids = {
    fromProvince: 'fromDistrict',
    toProvince: 'toDistrict'
  }
  let form = {
    fromProvince: '',
    fromDistrict: '',
    toProvince: '',
    toDistrict: '',
    weight: '',
  };
  // List of provinces and districts of Rwanda
  const provinces = {
    eastern: {
      name: "eastern province",
      districts: {
        "bugesera": { name: "Bugesera" }, "Gatsibo": { name: "Gatsibo" },
        "kayonza": { name: "Kayonza" }, "Kirehe": {  name: "Kirehe"  },
        "ngoma": {  name: "Ngoma"  },  "nyagatare": {  name: "Nyagatare"  },
        "rwamagana": {  name: "Rwamagana"  }
      } 
     },
    "kigali": { 
      name: "kigali",
      districts: {
        "gasabo": {  name: "Gasabo"  }, "Kicukiro": {  name: "Kicukiro"  },
        "nyarugenge": {  name: "Nyarugenge"  } 
      } 
    },
    "northern": { 
      name: "Northern province",
      districts: {
        "burera": {  name: "Burera"  },  "gakenke": {  name: "Gakenke"  },
        "gicumbi": {  name: "Gicumbi"  },  "musanze": {  name: "Musanze"  },
        "rulindo": {  name: "Rulindo"  }
      }
    },
    "southern": {
      name: "southern province",
      districts: {
        "gisagara": {  name: "Gisagara"  },  "huye": {  name: "Huye"  },
        "kamonyi": {  name: "Kamonyi"  },  "muhanga": {  name: "Muhanga"  },
        "nyamagabe": {  name: "Nyamagabe"  },  "nyanza": {  name: "Nyanza"  },
        "nyaruguru": {  name: "Nyaruguru"  },  "ruhango": {  name: "Ruhango"  }
      }
    },
    "western": {
      name: "western province",
      districts: {
        "karongi": {  name: "Karongi"  },  "ngororero": {  name: "Ngororero"  },
        "nyabihu": {  name: "Nyabihu"  },  "nyamasheke": {  name: "Nyamasheke"  },
        "rubavu": {  name: "Rubavu"  },  "rusizi": {  name: "Rusizi"  },
        "rutsiro": {  name: "Rutsiro"  }
      }
    }
  }
  // Initialise select inputs and errors
  const fromProvince = document.querySelector('#fromProvince');
  const toProvince = document.querySelector('#toProvince');
  const quoteError = document.querySelector('.quote-error');

  // const toDistrict = document.querySelector('#toDistrict');

  fromProvince.addEventListener('change', provinceCallBack);
  toProvince.addEventListener('change', provinceCallBack);

  // district.addEventListener('change', (e) => {
  //   form.district = e.target.value
  // });

  function provinceCallBack(e) {
    const value = e.target.value;
    const id =  e.target.id; 
    // Dynamic selection of District option element based on Province event selection
    const district = document.querySelector(`#${ids[id]}`);
    console.log('district', value, id, ids[value])
    if (value && district) {
      console.log()
      form.province = value;
      const districts = provinces[value].districts || []
      district.options.length = 0; //Reset district option to 0
      district.options[0] = new Option('Select'); // Add the first option to district

      // Add all district from the selected province
      for(let index in districts) {
        district.add(new Option(districts[index].name, index));
      };
    }
  }

  const submitQute = document.querySelector('#submit-quote');
  submitQute.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.fromDistrict && form.toDistrict && form.weight) {
      quoteError.classList.remove('active');
    } else {
      quoteError.classList.add('active');
    }
  });
})();
