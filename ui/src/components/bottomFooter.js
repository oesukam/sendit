const footer = {
  render: async () => `
    <div class="container">
      <div class="row">
        <div class="col-3">
          <img class="footer-logo" src="./images/logo.png" alt="logo">
        </div>
        <div class="col-3">
          <h3 class="footer-title">Site Map</h3>
          <ul class="footer-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="quote.html">Get A Quote</a></li>
          </ul>
        </div>
        <div class="col-3">
          <h3 class="footer-title">Partners</h3>
          <ul class="footer-list">
            <li><a href="#">DHL</a></li>
            <li><a href="#">Postal</a></li>
          </ul>
        </div>
        <div class="col-3">
          <h3 class="footer-title">Social</h3>
          <ul class="footer-list">
            <li>
              <a href="#"><i class="fa fa-facebook is-white"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-twitter is-white"></i> Twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  after_render: async () => { }
}

export default footer;
