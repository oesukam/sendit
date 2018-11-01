(() => {
  // 
  const toggleMenu = document.querySelector('.hamburger');
  toggleMenu.addEventListener('click', (e) => {
    e.preventDefault()
    e.target.classList.toggle('active')
    const menuNav = document.querySelector('#menu-nav')
    menuNav.classList.toggle('active');
  })
})()