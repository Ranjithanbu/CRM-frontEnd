import React from 'react';
import '../Css/Nav.css'
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='mainNav text-white'>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand text-white" href="#"><img className='me-1' src="https://cdn-icons-png.flaticon.com/512/906/906341.png" width={35} alt="logo" />CRM<span>plus</span></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink class="nav-link  mx-4 text-white" aria-current="page" to="/"><i class="fa-solid fa-house me-1" style={{ color: "#4e3b91;" }}></i>Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link  mx-4 text-white" to="/about"><i class="fa-solid fa-circle-info me-1"></i>About</NavLink>
              </li>

              <li class="nav-item">
                <NavLink class="nav-link  mx-4 text-white" to="signUp"><i class="fa-solid fa-user-plus me-1"></i>Sign Up</NavLink>
              </li>

              <li class="nav-item">
                <NavLink class="nav-link  mx-4 text-white" to="signIn"><i class="fa-solid fa-right-to-bracket me-1"></i>Sign In</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;