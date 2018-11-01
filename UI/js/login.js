'use strict';

(() => {
  let form = {
    email: '',
    password: ''
  }
  const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const submitLogin = document.querySelector('#submit-login');

  email.addEventListener('input', inputHandler);
  password.addEventListener('input', inputHandler);
  submitLogin.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Reset form errors to empty string
    document.querySelector('.form-error.email').textContent = '';
    document.querySelector('.form-error.password').textContent = '';
    
    // Validate email
    if (!form.email) {
      document.querySelector('.form-error.email').style.color = 'red';
      document.querySelector('.form-error.email').textContent = 'Email Required.';
      return;
    } 
    if (!testEmail.test(form.email)) {
      document.querySelector('.form-error.email').style.color = 'red';
      document.querySelector('.form-error.email').textContent = 'Enter a correct email.';
      return
    }

    // Validate password
    if (!form.password) {
      document.querySelector('.form-error.password').style.color = 'red';
      document.querySelector('.form-error.password').textContent = 'Password Required.';
      return;
    }
    
    location.href = 'profile.html';
  })

  // Callback function to handle email and password imput
  function inputHandler (e) {
    form[e.target.id] = e.target.value;
  }
})();
