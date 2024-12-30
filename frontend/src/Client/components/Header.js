import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";


const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Livraison Partout au Maroc !</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Contacter-nous : <a href="tel:123-456-7890" className="text-white">123-456-7890</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  <img src="images/MediLogo.png" alt="" />
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link to="/UserProfile" className="d-flex align-items-center gap-10 text-white" >
                    <img src="images/compare.svg" alt="Icon1" />
                    <p className="mb-0">Compare <br/>Produit
                    </p>
                  </Link>
                
                </div>
                <div>
                  <Link to="Wishlist" className="d-flex align-items-center gap-10 text-white">
                    <img src="images/wishlist.svg" alt="Icon2" />
                    <p className="mb-0">Favoris <br/>Produit</p>
                  </Link>
                </div>
                <div className="account-menu">
            <Link to="/Login" className="d-flex align-items-center gap-10 text-white">
                <img src="images/user.svg" alt="Icon3" />
                <p className="mb-0">Mon <br /> Compte</p>
            </Link>
        </div>
                <div>
                  <Link to="/Cart" className="d-flex align-items-center gap-10 text-white">
                    <img src="images/cart.svg" alt="Cart" />
                    <div className="d-flex flex-column gap-10">
                    <span className="badge bg-white top-0 text-dark">0</span>
                    <p className="mb-0"></p>
                    </div>
          
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-10 d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="images/menu.svg" alt="Menu" />
                    <span className="me-5 d-inline-block">Catégories</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <Link className="dropdown-item text-dark" to="#">Action</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dark" to="#">Another action</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-dark" to="#">Something else here</Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Accueil</NavLink>
                    <NavLink to="/Productlist">Produits</NavLink>
                    <NavLink to="/about">À propos</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
