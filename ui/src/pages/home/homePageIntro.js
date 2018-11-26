const intro = {
  render: async () => `
    <div class="intro-area">
      <div class="container">
        <div class="row">
          <div class="col-8 content-center items-center is-column">
            <h3 class="intro-area__title">SendIT</h3>
            <p class="intro-area__text">
              We deliver all size of parcels accros the whole Rwanda and
              keep you updated on the location of your parcel.
            </p>
          </div>
          <div class="col-4">
            <div class="country-map"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  after_render: async () => { }
}

export default intro;
