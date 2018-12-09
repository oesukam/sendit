import fetchAPI from '../../utils/fetchAPI.js';
import nav from '../../utils/navigation.js';
import model from '../../utils/model.js';

const Page = {
 render : async () => `
  <div class="container">
    <div class="row content-center">
      <div class="col-8"><br><br>
        <div class="box align-center">
          <h2 class="align-center">Confirm email</h2>
          <div class="form-error error-message p-20"></div>
          
          <a class="btn primary align-center mb-10" href="/#/">Go to Home</a>
        </div>
      </div>
    </div>
  </div>
 `,
 after_render: async () => {
  const params = nav.extractRequestURL();
  const userId = params[1];
  const confirmationCode = params[3];
  const errorMessage = document.querySelector('.form-error.error-message');
  const loading = document.querySelector('.loading');

  fetchAPI(`/users/${userId}/confirmEmail/${confirmationCode}`)
    .then((res) => {
      if (res.message) {
        errorMessage.textContent = res.message;
        model({
          title: 'Confirm Email',
          body: res.message, 
        });
      }
      // Wait for 2 seconds to smooth the spinner
      setTimeout(() => {
        loading.classList.remove('active');
      }, 2000);
    })
    .catch((err) => {
      loading.classList.remove('active');
      if (err.message) {
        errorMessage.textContent = err.message;
      }
    })

  // Callback function to handle email and password imput
  function inputHandler (e) {
    form[e.target.id] = e.target.value;
  }
 }
}

export default Page;
