'use strict';

(() => {
  const loadingPage = document.querySelector('.loading');
  const toggleMenu = document.querySelector('.toggle-menu');
  toggleMenu.addEventListener('click', (e) => {
    e.preventDefault()
    const hamburger = document.querySelector('.hamburger');
    const menuNav = document.querySelector('#menu-nav');
    hamburger.classList.toggle('active');
    menuNav.classList.toggle('active');
  });

  setTimeout(() => {
    loadingPage.classList.remove('active');
  }, 2000);
})();
