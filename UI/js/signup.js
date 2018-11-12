'use strict';

(() => {
  let form = {
    firstName: '',
    lastName: '',
    province: '',
    district: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  // List of provinces and districts of Rwanda
  const provinces  = {
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
  // Initialise select inputs
  const province = document.querySelector('#province');
  const district = document.querySelector('#district');

  province.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value) {
      form.province = value;
      const districts = provinces[value].districts || []

      district.options.length = 0; //Reset district option to 0
      district.options[0] = new Option('Select'); // Add the first option to district

      // Add all district from the selected province
      for(let index in districts) {
        district.add(new Option(districts[index].name, index));
      };
    }
  });

  district.addEventListener('change', (e) => {
    form.district = e.target.value
  });
})();
