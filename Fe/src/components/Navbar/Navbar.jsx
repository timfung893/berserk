import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";
import Products from "../Products/Products";
import Nav from "./Navbar.css";

const Navbar = (props) => {
  const cart = props.cart.length;
  const fav = props.fav.length;
  const temp = props.tempText;
  let keyWords = "";

  //  get search text
  function isChanged(e) {
    keyWords = e.target.value;
  }

  // search product with temptext
  function performSearch(e, temp) {
    props.getTempText(keyWords);
    const url = window.location.pathname;
    console.log(url);
    if (url === "/products") {
      e.preventDefault();
    }
    console.log("send searchtext", temp);
  }

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
              placeholder="type a character name with the 1st letter capitalized"
              aria-label="Search"
              name="search"
              onChange={(e) => isChanged(e)}
              title="type a character name - Ex: 'Guts'"
            />
            <NavLink
              className="btn btn-outline-success"
              type="submit"
              to={"/products"}
              onClick={(e) => performSearch(e, temp)}
            >
              Search
            </NavLink>
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
    allProducts: [],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTempText: (tempText) => {
      dispatch({ type: "SEARCH_TEXT", tempText });
    },
    getAllProducts: (data) => {
      dispatch({ type: "ALL_PRODUCTS", data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
