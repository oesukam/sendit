
const Page = {
 render : async () => `
  <div class="container">
    <div class="row content-center">
      <div class="col-6">
        <div class="box login-container">
          <h3 class="title primary align-center">Login</h3>
          <form action="#">
            <label for="email">Email</label>
            <input type="text" name="email" id="email">
            <div class="form-error email"></div>

            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            <div class="form-error password"></div>

            <button class="forgot-password">
              Forgot Password
            </button>
            <button id="submit-login" class="btn primary">Login</button>
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

    location.href = '/#/profile';
  })

  // Callback function to handle email and password imput
  function inputHandler (e) {
    form[e.target.id] = e.target.value;
  }
 }
}

export default Page;
