import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisé pour la redirection

// Fonction pour récupérer toutes les commandes
const getAllOrders = async () => {
  const API_URL = 'http://localhost:5000/api'; // Modifiez si nécessaire
  try {
    const response = await fetch(`${API_URL}/orders/getorders`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commandes');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const OrderList = () => {
  const [orders, setOrders] = useState([]); // Assurez-vous que c'est un tableau
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        console.log('Données des commandes:', data); // Ajoutez ce log pour déboguer
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, []);

  // Fonction pour gérer le clic sur une commande
  const handleOrderClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`); // Redirige vers la page de détails de la commande
  };

  if (error) {
    return <div>{error}</div>;
  }

  // Vérifiez si orders est un tableau avant d'utiliser map
  if (!Array.isArray(orders)) {
    return <div>Aucune commande disponible.</div>;
  }

  return (
    <div className='order-wrapper  mt-4'>
<div class="container mt-4 recherche-wrapper">
    <div class="row align-items-center">
    <div class="col-3">
            <h1 class="d-inline">Commandes {orders.length}</h1> 
        </div>
        <div class="col-3">
            <input type="date" id="dateFilter" class="form-control" />
        </div>
        <div class="col-3">
            <select id="statusFilter" class="form-select">
                <option value="">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
                <option value="en_attente">En attente</option>
            </select>
        </div>
        <div class="col-3 ">
            <button class="btn btn-primary">Appliquer les filtres</button>
        </div>
    </div>
</div>


      <table className='order-table'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Montant Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} onClick={() => handleOrderClick(order._id)} style={{ cursor: 'pointer' }}>
              <td>{order.firstname}</td>
              <td>{order.lastname}</td>
              <td>{order.email}</td>
              <td>{order.mobile}</td>
              <td>{order.totalAmount}dh</td>
              <td>
                {order.status === 'payé' && <span className="product-active">payé</span>}
                {order.status === 'rejeté' && <span className="product-inactive">Inactive</span>}
                {order.status === 'en_attente' && <span className="product_attente">en attente</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;