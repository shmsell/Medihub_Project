// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Exemple d'en-tête
import Footer from "./Footer";


const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Rend les composants enfants */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
