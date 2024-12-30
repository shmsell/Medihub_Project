import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Client/components/Layout";
import About from "./Client/Pages/About";
import Home from "./Client/Pages/Home";
import Contact from "./Client/Pages/Contact";
import Productlist from "./Client/Pages/Productlist";
import Login from "./Client/Pages/Login";
import UserProfile from "./Client/Pages/Compte";
import Wishlist from "./Client/Pages/Wishlist";
import Cart from "./Client/Pages/Cart";
import SingleProduct from "./Client/Pages/SingleProduct";
import Signupuser from "./Client/Pages/SingupUser";
import Checkout from  "./Client/Pages/Checkout";
import ConfirmationOrder from  "./Client/Pages/OrderConfirmation";
import SupplierLogin from "./fournisseur/Pages/SupplierLogin";
import SupplierSingup from "./fournisseur/Pages/SupplierSingup";
import MainLayout from "./fournisseur/components/MainLayout"; 
import Dashboard from "./fournisseur/Pages/Dashboard";
import Addproduct from "./fournisseur/Pages/Addproduct";
import Product from "./fournisseur/Pages/Product";
import MainLayoutAdmin from "./admin/components/MainLayout";
import DashboardAdmin from "./admin/Pages/DashboardAdmin"
import Supplier from "./admin/Pages/Supplier";
import Category from "./admin/Pages/Category";
import ProductListAdmin from "./admin/Pages/ProductlistAdmin";
import Orders from "./admin/Pages/Orders";
import OrderDetails from "./admin/Pages/OrderDetails";
import Supplierorder from "./fournisseur/Pages/Supplierorder";
import SupplierProfile from"./fournisseur/Pages/SupplierProfile";
import AddProductRequest from "./admin/Pages/ProductRequest";
import ProductRequestlist from "./admin/Pages/ProductRequestslist"







function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="Productlist" element={<Productlist />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="Login" element={<Login />} />
          <Route path="UserProfile" element={<UserProfile />} />

          <Route path="singupUser" element={<Signupuser />} />
          <Route path="Wishlist" element={<Wishlist />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Checkout" element={<Checkout />} /> 
          <Route path="ConfirmationOrder" element={< ConfirmationOrder />} /> 
          <Route path="SupplierLogin" element={<SupplierLogin />} />
          <Route path="SupplierSingup" element={<SupplierSingup />} />
          <Route path="SupplierDashboard" element={<Dashboard />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="Supplierlistproduct" element={<Product />} />
          <Route path="Supplierlistproduct" element={<Product />} />
          <Route path="Supplierorder" element={<Supplierorder />} />
          <Route path="SupplierProfile" element={<SupplierProfile />} />



        </Route>
        <Route path="/admin" element={<MainLayoutAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="Supplier" element={<Supplier />} />
          <Route path="Category" element={<Category />} />
          <Route path="ProductListAdmin" element={<ProductListAdmin />} />
          <Route path="AddProductRequest" element={<AddProductRequest />} />
          <Route path="ProductRequestlist" element={<ProductRequestlist />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Orders/:id" element={<OrderDetails />} />





        </Route>
      </Routes>
    </Router>
  );
}

export default App;
