import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand fw-bolder" to="/">
          <img
            className="icon"
            src="./img/bs-icon.jpg"
            height="80px"
            width="80px"
            alt="icon"
          />
        </NavLink>
        <button
          className="navbar-toggler mx-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto bg-white">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="/"
              >
                Dropdown
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Another action
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/">
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <div className="login">
            <NavLink to="/login" className="btn btn-outline-dark ms-2">
              <i className="fa fa-sign-in"> Login</i>
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark ms-2">
              <i className="fa fa-user-plus "> Register</i>
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark me-2 ms-2">
              <i className="fa fa-shopping-cart "> Cart(0)</i>
            </NavLink>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
