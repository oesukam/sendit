import fetchAPI from '../../utils/fetchAPI.js';
import store from '../../utils/store.js';

const Page = {
 render : async () => `
  <div class="container">
    <div class="row content-center">
      <div class="col-4"><br><br>
        <div class="box login-container">
          <p class="align-center">
            <img class="brand-title" src="./images/logo-blue.png" alt="logo">
          </p>
          <form action="#">
            <input type="text" name="email" id="email" placeholder="Email">
            <div class="form-error email"></div>

            <input type="password" name="password" id="password" placeholder="Password">
            <div class="form-error password"></div>

            <button id="submit-login" class="btn primary v-wide mt-10">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
 `,
 after_render: async () => {
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
  const loading = document.querySelector('.loading');

  email.addEventListener('input', inputHandler);
  password.addEventListener('input', inputHandler);
  submitLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loading.classList.add('active');
    // Reset form errors to empty string
    emailError.textContent = '';
    passwordError.textContent = '';
    let hasError = false;

    // Validate email
    if (!form.email) {
      emailError.style.color = 'red';
      emailError.textContent = 'Email Required.';
      hasError = true;
    }
    if (!testEmail.test(form.email)) {
      emailError.style.color = 'red';
      emailError.textContent = 'Enter a correct email.';
      hasError = true;
    }

    // Validate password
    if (!form.password) {
      passwordError.style.color = 'red';
      passwordError.textContent = 'Password Required.';
      hasError = true;
    }
    if (hasError) {
      setTimeout(() => loading.classList.remove('active'), 2000);
      return;
    }
    fetchAPI('/auth/login', { method: 'post', body: form })
      .then((res) => {
        const { success, data, token } = res;
        loading.classList.remove('active');

        if (success && token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data));
          store.token = token,
          store.user = data
          location.href = `/#/profile/${data.id}`;
        }

      })
      .catch((err) => {
        loading.classList.remove('active');
        console.log(err);
      })
  })

  // Callback function to handle email and password imput
  function inputHandler (e) {
    form[e.target.id] = e.target.value;
  }
 }
}

export default Page;
