const testimonies = {
  render: async () => {
      let view =  /*html*/`
        <div class="container items-center">
          <div class="testimonies-area">
            <div class="testimonies">
              <div class="testimony-block">
                <div class="testimony-content">
                  <img class="testimony-avatar" src="../../images/profile-female.png" />
                  <h3 class="testimony-content__title">First Name Last name 1</h3>
                  <div class="testimony-content__text">
                    <i class="fa fa-quote-left is-white"></i>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                      libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                      minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                    </div>
                    <i class="fa fa-quote-right is-white"></i>
                  </div>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="testimony-block">
                <div class="testimony-content">
                  <img class="testimony-avatar" src="../../images/profile-male.png" />
                  <h3 class="testimony-content__title">First Name Last name 2</h3>
                  <div class="testimony-content__text">
                    <i class="fa fa-quote-left is-white"></i>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                      libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                      minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                    </div>
                    <i class="fa fa-quote-right is-white"></i>
                  </div>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                  </div>
                </div>
              </div>
              <div class="testimony-block">
                <div class="testimony-content">
                  <img class="testimony-avatar" src="../../images/profile-female.png" />
                  <h3 class="testimony-content__title">First Name Last name 3</h3>
                  <div class="testimony-content__text">
                    <i class="fa fa-quote-left is-white"></i>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                      libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                      minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                    </div>
                    <i class="fa fa-quote-right is-white"></i>
                  </div>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="testimony-block">
                <div class="testimony-content">
                  <img class="testimony-avatar" src="../../images/profile-female.png" />
                  <h3 class="testimony-content__title">First Name Last name 4</h3>
                  <div class="testimony-content__text">
                    <i class="fa fa-quote-left is-white"></i>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                      libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                      minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                    </div>
                    <i class="fa fa-quote-right is-white"></i>
                  </div>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="testimony-block">
                <div class="testimony-content">
                  <img class="testimony-avatar" src="../../images/profile-female.png" />
                  <h3 class="testimony-content__title">First Name Last name 5</h3>
                  <div class="testimony-content__text">
                    <i class="fa fa-quote-left is-white"></i>
                    <div>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam aliquam 
                      libero exercitationem, temporibus eligendi optio expedita eius suscipit, 
                      minus, cupiditate animi officia odit ipsam ut nemo cum ducimus error neque?
                    </div>
                    <i class="fa fa-quote-right is-white"></i>
                  </div>
                  <div class="testimony-stars">
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star active"></i>
                    <i class="fa fa-star"></i>
                  </div>
                </div>
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