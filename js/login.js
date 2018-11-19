'use strict';

(() => {
  let form = {
    email: '',
    password: '',
  };
  const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const email = document.querySelector('#email');
  const emailError = document.querySelector('.form-error.email');
  const password = document.querySelector('#password');
  const passwordError = document.querySelector('.form-error.password');
  const submitLogin = document.querySelector('#submit-login');

  email.addEventListener('input', inputHandler);
  password.addEventListener('input', inputHandler);
  submitLogin.addEventListener('click', (e) => {
    e.preventDefault();

    // Reset form errors to empty string
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validate email
    if (!form.email) {
      emailError.style.color = 'red';
      emailError.textContent = 'Email Required.';
      return;
    }
    if (!testEmail.test(form.email)) {
      emailError.style.color = 'red';
      emailError.textContent = 'Enter a correct email.';
      return;
    }

    // Validate password
    if (!form.password) {
      passwordError.style.color = 'red';
      passwordError.textContent = 'Password Required.';
      return;
    }

    location.href = 'profile.html';
  })

  // Callback function to handle email and password imput
  function inputHandler (e) {
    form[e.target.id] = e.target.value;
  }
})();
