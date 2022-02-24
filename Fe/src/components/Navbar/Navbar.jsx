import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { productSource } from "../firebaseConnect";
import Products from "../Products/Products";
import Nav from "./Navbar.css";

const Navbar = (props) => {
  const cart = props.cart.length;
  const fav = props.fav.length;
  const temp = props.tempText;
  const data = props.allProducts;

  useEffect(() => {
    function getProducts() {
      productSource.on("value", function (products) {
        var productArr = [];
        products.forEach((product) => {
          const key = product.key;
          const desc = product.val().desc;
          const img = product.val().img;
          const price = product.val().price;
          const type = product.val().type;

          productArr.push({
            id: key,
            desc: desc,
            img: img,
            price: price,
            type: type,
          });
        });

        props.getAllProducts(productArr);
        console.log(props.allProducts);
      });
    }
    getProducts();
  }, []);

  //  save search text in store as temptext
  function getTempText(e) {
    const temp = e.target.value;
    props.getTempText(temp);
    console.log(temp);
  }

  // search product with temptext
  function performSearch(e, tempText) {
    const filteredSearch = [];
    // e.preventDefault();

    data.forEach((x) => {
      if (x.desc.indexOf(temp) !== -1) {
        filteredSearch.push(x);
        console.log("ok");
      } else {
        console.log("search error");
      }
    });
    props.getAllProducts(filteredSearch);
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
              placeholder="type a character name"
              aria-label="Search"
              name="search"
              onChange={(e) => getTempText(e)}
            />
            <NavLink
              className="btn btn-outline-success"
              type="reset"
              to={"/products"}
              onClick={(e) => performSearch(e, props.tempText)}
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
