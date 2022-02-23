import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Navbar.css";

const Navbar = (props) => {
  const cart = props.cart.length;
  const fav = props.fav.length;

  function searchText(e) {
    const tempText = e.target.value;
    console.log(tempText);
  }

  function performSearch(e) {}
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto bg-light justify-content-between">
            <li className="nav-item fw-bolder">
              <NavLink
                className="nav-link mx-2"
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item fw-bolder mx-2">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item fw-bolder mx-2">
              <NavLink className="nav-link" to="/favorites">
                Your Favorites({fav})
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="/favorites"
              >
                Your Favorites
              </NavLink> */}
            {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
              </ul> */}
            {/* </li> */}
          </ul>
          <div className="login">
            <NavLink to="/login" className="btn btn-outline-dark ms-2">
              <i className="fa fa-sign-in"> Login</i>
            </NavLink>
            <NavLink to="/register" className="btn btn-outline-dark ms-2">
              <i className="fa fa-user-plus "> Register</i>
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark me-2 ms-2">
              <i className="fa fa-shopping-cart "> Cart({cart})</i>
            </NavLink>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="type a character name"
              aria-label="Search"
              name="search"
              onChange={(e) => searchText(e)}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={(e) => performSearch(e)}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart,
    fav: state.fav,
    tempText: "",
  };
};

export default connect(mapStateToProps, null)(Navbar);
