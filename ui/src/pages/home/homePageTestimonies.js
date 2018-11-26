const testimonies = {
  render: async () => {
      let view =  /*html*/`
        <div class="testimonies-area">
          <div class="container items-center">
            <div class="testimonies">
              <div class="testimony-block">
                <i class="fa fa-quote-left is-white"></i>
                <div class="testimony-content">
                  <h3 class="testimony-content__title">Name</h3>
                  <p class="testimony-content__text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                    libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                    minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                  </p>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
                <i class="fa fa-quote-right is-white"></i>
              </div>
            </div>
          </div>
        </div>
      `
      return view
  },
  after_render: async () => { }
}

export default testimonies;