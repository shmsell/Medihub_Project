import React from "react";
import { BsSearch } from "react-icons/bs";

import { NavLink, Link } from "react-router-dom";
const avantages = [
    {
      icon: "🟢", // Remplacez par l'icône réelle ou une image
      title: "Health points",
      description: "Notre programme de fidélité pour bénéficier de réductions supplémentaires"
    },
    {
      icon: "💸", // Remplacez par l'icône réelle ou une image
      title: "Jusqu’à -50%",
      description: "Des promotions exclusives toute l’année sur un grand nombre de produits"
    },
    {
      icon: "🛒", // Remplacez par l'icône réelle ou une image
      title: "Panier optimisé",
      description: "La meilleure sélection pour économiser lors de votre commande"
    },
    {
      icon: "🚚", // Remplacez par l'icône réelle ou une image
      title: "Livraison gratuite",
      description: "Pour tout achat de plus de 499dh"
    }
  ];

const Footer =() =>{
    return(<>
            <div className="avantages-container">
      <h2>Découvrez comment faire des économies sur MediHub</h2>
      <p>Profitez de tous nos avantages</p>
      <div className="avantages-grid">
        {avantages.map((avantage, index) => (
          <div className="avantage-item" key={index}>
            <div className="icon">{avantage.icon}</div>
            <h3>{avantage.title}</h3>
            <p>{avantage.description}</p>
          </div>
        ))}
      </div>
    </div>
    <footer className="py-4">
        <div className="container-xxl">
            <div className="row align-items-center">
                <div className="col-5">
                    <div className="footer-top-data d-flex gap-30 align-items-center">
                        <img src="images/newsletter.png" alt="" />
                        <h4 className="mb-0 text-white">Restez informé des dernières nouveautés</h4>
                    </div>
                </div>
                <div className="col-7">
                  <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                    S'inscrire
                </span>
                 </div>
                 </div>
            </div>
        </div>
    </footer>
    <footer className="py-4">
        <div className="container-xxl">
            <div className="row">
                <div className="col-4">
                    <h4 className="text-white">Contacter-Nous</h4>
                    <div className="footer-link d-flex flex-column">
                       <address   className="text-white py-2 mb-1"> Adress : Rabat</address>
                       <Link to="" className="text-white py-2 mb-1"> Telephone: 0662221134</Link>                       
                       <Link to="" className="text-white py-2 mb-1"> Email: MediHub@contact.vom</Link>

                    </div>
                </div>
                <div className="col-3">
                    <h4 className="text-white"> Information</h4>
                    <div className="footer-link d-flex flex-column">
                       <Link  to="" className="text-white py-2 mb-1">Politique d'expédition</Link>
                       <Link to="" className="text-white py-2 mb-1"> Politique de confidentialté</Link>                       
                       <Link to="" className="text-white py-2 mb-1">Politique de remboursement</Link>
                       <Link  to=""className="text-white py-2 mb-1"> Conditions d'utilisation</Link>
                    </div>
                </div>
                <div className="col-3">
                    <h4 className="text-white">Compte</h4>
                    <div className="footer-link d-flex flex-column">
                       <Link  to="" className="text-white py-2 mb-1">à propos de nous</Link>
                       <Link to="" className="text-white py-2 mb-1">FAQ</Link>                       
                       <Link to="" className="text-white py-2 mb-1">Contact</Link>
                    </div>
                </div>
                <div className="col-2">
                    <h4 className="text-white">Fournisseur</h4>
                    <div className="footer-link d-flex flex-column">
                       <Link  to="/SupplierLogin" className="text-white py-2 mb-1">Vender sur MediHub</Link>
                       <Link to="" className="text-white py-2 mb-1"></Link>                       
                       <Link to="" className="text-white py-2 mb-1"></Link>
                       <Link  to=""className="text-white py-2 mb-1"></Link>
                    </div>
                </div>

            </div>
        </div>
    </footer>
    <footer  className="py-4">
        <div className="container-12">
            <div className="row">
                <div className="col-12">
                    <p className="text-center mb-0 text-white">&copy;{new Date().getFullYear()} Powered by chaimae msellek</p>
                </div>
            </div>
        </div>
    </footer>

    </>);
};
export default Footer