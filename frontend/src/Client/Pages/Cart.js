import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null); // Pour stocker l'ID du panier
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Vous devez être connecté pour voir votre panier.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/cart/getCart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Erreur lors de la récupération du panier');
        }

        const cartData = await response.json();
        setCartId(cartData.cartId); // Récupérer l'ID du panier
        setCartItems(cartData.items || []);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }), // Passer l'ID du produit à supprimer
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de la suppression du produit');
      }

      // Mettre à jour l'état pour retirer l'élément supprimé
      setCartItems(cartItems.filter(item => item.productId._id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      setError(error.message);
    }
  };

  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p>{error}</p>;

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.productId.prix * 1.6 * item.quantity), 0);
  };

  return (
    <section className="cart-wrapper">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-product p-4">
                <h5 className="mb-3">
                  <Link to="/products" className="text-body">
                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                    <FaArrowLeftLong className="me-1" /> Continuer vos achats
                  </Link>
                </h5>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Panier</p>
                    <p className="mb-0">Vous avez {cartItems.length} articles dans votre panier</p>
                  </div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.productId._id} className="cart-product mb-3">
                    <div className="">
                      <div className="d-flex justify-content-between align-items-center">
                        {/* Section du produit */}
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            <img
                              src={`http://localhost:5000/uploads/${item.productId.coverPhoto}`}
                              className="img-fluid rounded-3"
                              alt={item.productId.nom}
                              style={{ width: "65px" }}
                            />
                          </div>
                          <div className="content ms-3">
                            <h5 className="title">{item.productId.nom}</h5>
                            <p className="price small mb-0">
                              {(item.productId.prix * 1.6).toFixed(2)} dh
                            </p>
                          </div>
                        </div>

                        {/* Section de la quantité */}
                        <div className="quantity-wrapper d-flex align-items-center mx-5">
                          <button
                            className="btn btn-light me-2"
                            onClick={() => {
                              const updatedItems = cartItems.map(cartItem =>
                                cartItem.productId._id === item.productId._id && item.quantity > 1
                                  ? { ...cartItem, quantity: item.quantity - 1 }
                                  : cartItem
                              );
                              setCartItems(updatedItems);
                            }}
                          >
                            -
                          </button>

                          <div style={{ width: "50px", textAlign: "center" }}>
                            <input
                              type="number"
                              className="form-control text-center"
                              value={item.quantity}
                              readOnly
                            />
                          </div>

                          <button
                            className="btn btn-light ms-2"
                            onClick={() => {
                              const updatedItems = cartItems.map(cartItem =>
                                cartItem.productId._id === item.productId._id && item.quantity < 10
                                  ? { ...cartItem, quantity: item.quantity + 1 }
                                  : cartItem
                              );
                              setCartItems(updatedItems);
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Section du total */}
                        <div className="d-flex align-items-center ms-5">
                          <h5 className="total mb-0">
                            {(item.productId.prix * 1.6 * item.quantity).toFixed(2)} dh
                          </h5>
                          <div className="deleteicon ms-3">
                            <MdDelete onClick={() => handleDeleteItem(item.productId._id)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div className="col-lg-4">
              <div className="Details-wrapper p-4">

                <div className="card-body">
                  <h5 className="mb-0">Détails de paiement</h5>
                  <hr />

                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Sous-total</p>
                    <p className="mb-2">{calculateTotal().toFixed(2)} dh</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Livraison</p>
                    <p className="mb-2">20 dh</p>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <p className="mb-2">Total</p>
                    <p className="mb-2">{(calculateTotal() + 20).toFixed(2)} dh</p>
                  </div>
                  <Link
                    to={`/checkout?total=${(calculateTotal() + 20).toFixed(2)}`}
                    className="button"
                  >
                    Passer à la caisse
                  </Link>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;
