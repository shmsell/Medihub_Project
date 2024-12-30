import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(''); // État pour le statut de la commande
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setOrder(data);
          setStatus(data.status); // Initialiser le statut de la commande
        } else {
          console.error('Erreur:', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la commande:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Fonction pour mettre à jour le statut de la commande
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PUT', // Ou 'PATCH' selon la méthode que vous utilisez dans votre API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus); // Mettre à jour l'état local avec le nouveau statut
        setMessage('Statut mis à jour avec succès');
      } else {
        setMessage('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      setMessage('Erreur de connexion au serveur');
    }
  };

  if (!order) {
    return <div>Chargement...</div>;
  }

  return (
    <section className="order-detail-wrapper">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="row">
            <div className="col-lg-5">
              <div className="Details-wrapper p-4">
                <div className="card-body">
                <h5 className="mb-0">Détails de la Commande</h5>

                <div className="d-flex justify-content-between align-items-center">
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="badge  mb-2"
                      style={{ width: '150px' ,marginTop:'10px' ,fontSize:'15px' ,background:'#1cb3e4'}}
                    >
                      <option value="en attente">{status}</option>
                      <option value="expédié">Expédié</option>
                      <option value="livré">Livré</option>
                      <option value="annulé">Annulé</option>
                    </select>
                  </div>
                  <hr />

                  <div className="d-flex">
  <p className="mb-2 me-2">Nom:</p>
  <p>{order.firstname}</p>
</div>
<div className="d-flex">
  <p className="mb-2 me-2">Prénom:</p>
  <p>{order.lastname}</p>
</div>
<div className="d-flex">
  <p className="mb-2 me-2">Email:</p>
  <p>{order.email}</p>
</div>

<div className="d-flex">
  <p className="mb-2 me-2">Adresse de livraison:</p>
  <p className="">{order.shippingAddress.street}</p>
  <p className="">{order.shippingAddress.city}</p>
  <p>{order.shippingAddress.postalCode}</p>
</div>


                  {/* Ajouter un bouton pour changer le statut */}
                  {message && <p>{message}</p>} {/* Message de confirmation ou d'erreur */}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="cart-product p-4">
                <h5 className="mb-0">
                     Produits
                </h5>
                <hr />
                {order.cart && order.cart.items.map(item => (
                  <div key={item.productId} className="cart-product mb-3">
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
                          <h5 className="title"> {item.productId.nom}</h5>
                          <p className="price small mb-0">
                            {(item.productId.prix * 1.6).toFixed(2)} dh
                          </p>
                        </div>
                      </div>

                      {/* Section de la quantité */}
                      <div className="quantity-wrapper d-flex align-items-center mx-5">
                        {item.quantity}                    
                      </div>

                      {/* Section du total */}
                      <div className="d-flex align-items-center ms-5">
                        <h5 className="total mb-0">
                          {(item.productId.prix * 1.6 * item.quantity).toFixed(2)} dh
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='text-end '>
                  <h5 className="btn " style={{ width: '150px' ,marginTop:'10px' ,fontSize:'15px' ,background:'#1cb3e4',color:'white', fontStyle:'blod'}}>
  Total: 76,8 dh
</h5>  
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
