
const model = document.querySelector('#model');

const modelWrapper = ({ title = 'Title', body = '' } = {}) => {
  model.classList.add('show');
  model.innerHTML = `
    <div class="box">
      <h3 class="title model-title">${title}</h3>
      ${body}
      <button class="btn primary v-wide" onclick="closeModel()">Ok</button>
    </div>
  `
}

function closeModel () {
  model.classList.remove('show');
  window.location.reload();
}
window.closeModel = closeModel

export default modelWrapper;
