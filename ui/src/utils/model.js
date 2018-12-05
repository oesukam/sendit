
const model = document.querySelector('#model');

const modelWrapper = ({ title = 'Title', body = '' , reload = false} = {}) => {
  model.classList.add('show');
  model.innerHTML = `
    <div class="box">
      <h3 class="title model-title">${title}</h3>
      ${body}
      <button class="btn primary v-wide" onclick="closeModel(${reload})">Ok</button>
    </div>
  `
}

function closeModel (reload = true) {
  model.classList.remove('show');
  if (reload) {
    window.location.reload();
  }
}
window.closeModel = closeModel

export default modelWrapper;
