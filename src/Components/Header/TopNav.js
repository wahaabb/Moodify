import React from "react";
import { Link } from "react-router-dom";
import "../../SCSS/Components/_navbar.scss";
const Navbar = () => {
  const closeNavbar = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5 text-white" to="/">
          Moodify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link mx-3 text-white" to="/" onClick={closeNavbar}>
              Home
            </Link>
            <Link className="nav-link mx-3 text-white" to="/agent" onClick={closeNavbar}>
              AI✨
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
