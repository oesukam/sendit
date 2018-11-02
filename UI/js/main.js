'use strict';

(() => {
  let quote = {
    from: '',
    to: '',
    weight: ''
  }
  const toggleMenu = document.querySelector('.toggle-menu');
  toggleMenu.addEventListener('click', (e) => {
    e.preventDefault()
    const hamburger = document.querySelector('.hamburger');
    const menuNav = document.querySelector('#menu-nav');
    hamburger.classList.toggle('active');
    menuNav.classList.toggle('active');
  })
})()
