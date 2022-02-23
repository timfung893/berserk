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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Fav />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
