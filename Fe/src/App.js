import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Cart from "./components/cart/Cart";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Fav from "./components/Favorites/Fav";
import Noti from "./components/Noti/Noti";
import "./App.css";

function App(props) {
  const showNoti = () => {
    if (props.showNoti === true) {
      return <Noti />;
    }
  };

  // back to top btn
  const toTopBtn = useRef();
  console.log(toTopBtn);

  window.onscroll = function () {
    scrollFn();
  };

  function scrollFn() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      toTopBtn.current.style.display = "block";
    } else {
      toTopBtn.current.style.display = "none";
    }
  }

  function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log("is back");
  }

  return (
    <div className="App">
      <button className="bttop" ref={toTopBtn} onClick={() => toTop()}>
        <i className="fa fa-arrow-up"></i>
      </button>
      {showNoti()}
      <Navbar />
      <Routes>
        <Route path="/berserk" element={<Hero />} />
        <Route path="/berserk/about" element={<About />} />
        <Route path="/berserk/products" element={<Products />} />
        <Route path="/berserk/cart" element={<Cart />} />
        <Route path="/berserk/product/:id" element={<Product />} />
        <Route path="/berserk/login" element={<Login />} />
        <Route path="/berserk/register" element={<Register />} />
        <Route path="/berserk/favorites" element={<Fav />} />
      </Routes>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    showNoti: state.showNoti,
    productItem: state.productItem,
  };
};
export default connect(mapStateToProps, null)(App);
