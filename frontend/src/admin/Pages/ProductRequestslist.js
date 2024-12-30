
import React, { useEffect, useState } from 'react';

const ProductRequestlist = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductRequests = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Request/get-requests');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des demandes de produits');
                }
                const data = await response.json();
                setRequests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductRequests();
    }, []); // Le tableau vide signifie que l'effet ne s'exécute qu'une seule fois après le premier rendu

    if (loading) return <div>Chargement des demandes de produits...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className='order-wrapper'>
            <div class="container mt-4 recherche-wrapper">
    <div class="row align-items-center">
    <div class="col-3">
            <h1 class="d-inline">Ordre </h1> 
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
        <table className="order-table">
          <thead>
            <tr>
              <th>Demande ID</th>
              <th>Prix Total (DH)</th>
              <th>Produits</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{request.totalPrice} €</td>
                <td>
                  <ul>
                    {request.products.map((product) => (
                      <li key={product.productId}>
                        Produit ID: {product.productId} - Quantité: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                                    <span className={request.status === 'en_preparation' ? 'product-active' : 'product-inactive'}>
                                        {request.status}
                                    </span>
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    );
};

export default ProductRequestlist;
