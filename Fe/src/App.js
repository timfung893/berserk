import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Cart from "./components/cart/Cart";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Fav from "./components/Favorites/Fav";
import Noti from "./components/Noti/Noti";
import { connect } from "react-redux";

function App(props) {
  const showNoti = () => {
    if (props.showNoti === true) {
      return <Noti />;
    }
  };

  return (
    <div className="App">
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
