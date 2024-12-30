import React from 'react';
import { FaHeart, FaStar, } from 'react-icons/fa'; // Importation des icônes
import { MdOutlineShoppingCart } from "react-icons/md";


const ProduitSection = ({ products = [], onProductClick }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => {
            const prixFinal = product.prix * 1.6;

            return (
              <div className="col-md-3 mb-4" key={product._id}> {/* Réduire la largeur de la carte à 3 colonnes */}
                <div className="product-card-list" onClick={() => onProductClick(product._id)}>
                  
                  {/* Action Bar for Wishlist */}
                  <div className="action-bar">
                    <div className="icon">
                      <FaHeart className="wishlist-icon" /> {/* Icone du cœur */}
                    </div>
                  </div>

                  {/* Product Image */}
                  <img
                    src={`http://localhost:5000/uploads/${product.coverPhoto}`}
                    alt={product.nom}
                    className="card-img-top product-image"
                  />

                  {/* Product Details */}
                  <div className="card-body product-details">
                    <h5 className="title">{product.nom}</h5>
                    
                    {/* Seller Information */}
                    <p className="seller">Livraison Maroc</p>
                    <p className="seller">Flécibilité de paiment </p>


                    {/* Product Price and Add to Cart */}
                    <div className="price-cart">
                      <p className="price-tag">
                        {prixFinal.toFixed(2)} Dh
                      </p> 
                      <div className="cart-icon-container">
                           <MdOutlineShoppingCart className="cart-icon" />
                          </div>
                      
                      </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ProduitSection;
