import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../frontend/src/Client/components/Layout";
import About from "../Client//Pages/About";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Productlist from "./Pages/Productlist";
import Login from "./Pages/Login";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import singleProduct from "./Pages/SingleProduct";
import Signupuser from "./Pages/SingupUser";
import Checkout from  "./Pages/Checkout";
import SupplierLogin from "./Pages/SupplierLogin";



function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="Productlist" element={<Productlist />} />
          <Route path="Login" element={<Login />} />
          <Route path="singupUser" element={<Signupuser />} />
          <Route path="Wishlist" element={<Wishlist />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Checkout" element={<Checkout />} /> 
          <Route path="SupplierLogin" element={<SupplierLogin />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
