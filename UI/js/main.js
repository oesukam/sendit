
(() => {
  let quote = {
    from: '',
    to: '',
    weight: ''
  }
  // geoCoding to use Google Geocoding API and need substriction
  function geoCoding (text = '') {
    if (text) {
      fetch(`${geoLocUrl}${text}&region=rw&key=${apiKey}`)
      .then(res => res.json())
      .then(res => console.log('res', res))
      .catch(err => console.log(err))
    }
    return
  }
  const toggleMenu = document.querySelector('.hamburger');
  toggleMenu.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.classList.toggle('active')
    const menuNav = document.querySelector('#menu-nav')
    menuNav.classList.toggle('active');
  })

  document.querySelector('#from-input').addEventListener('input', (e) => {
    console.log('from', e.target.value);
  });

  document.querySelector('#to-input').addEventListener('input', (e) => {
    console.log('to', e.target.value);
  });
})()
