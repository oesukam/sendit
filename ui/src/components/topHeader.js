const topNav = {
  render: async () => `
    <div class="meu-header">
      <div class="container">
        <div class="col-8">
          <ul class="plain-list">
            <li><a href="#"><i class="fa fa-phone"></i> (+250)-000-000-000</a></li>
            <li><a href="#"><i class="fa fa-envelope"></i> info@sendit.com</a></li>
          </ul>
        </div>
        <div class="col-4 align-right">
          <ul class="plain-list">
            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li><a href="#"><i class="fa fa-youtube"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <a class="brand" href="index.html">
        <img class="brand__img" src="./images/logo.png" alt="logo">
      </a>
      <div class="toggle-menu is-tablet">
        <div class="hamburger"></div>
      </div>
      <nav id="menu-nav" class="nav pull-right">
        <ul>
          <li class="nav-item active"><a href="index.html">Home</a></li>
          <li class="nav-item"><a href="quote.html">Get A Quote</a></li>
          <li class="nav-item dropdown">
            <a href="#">Admin</a>
            <ul class="dropdown-block">
              <li class="nav-item"><a href="admin-orders.html">Admin Orders</a></li>
              <li class="nav-item"><a href="admin-order.html">Admin Update an Order</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="signup.html">Register</a></li>
          <li class="nav-item"><a href="login.html">Login</a></li>
          <li class="nav-item dropdown">
            <a href="#">My Account</a> 
            <ul class="dropdown-block">
              <li class="nav-item">
                <a href="profile.html">
                  <i class="fa fa-user mr-5"></i> My Profile
                </a>
              </li>
              <li class="nav-item"><a href="order.html">Single Order View</a></li>
              <li class="nav-item"><a href="make-order.html">Make an Order</a></li>
              <li class="nav-item"><a href="orders.html">My Orders</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  `,
  after_render: async () => { }
}

export default topNav;
