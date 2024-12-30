import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierOrder = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Vous devez être connecté pour voir cette page.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/supplier/products-to-prepare', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des demandes.');
                }

                const data = await response.json();
                setRequests(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/Request/update-status/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du statut.');
            }

            setRequests(prevRequests => prevRequests.map(request => 
                request._id === id ? { ...request, status: newStatus } : request
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (loading) {
        return <div className="text-center">Chargement des demandes...</div>;
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-danger">Erreur: {error}</p>
                <button className="btn btn-primary" onClick={handleLoginRedirect}>Se connecter</button>
            </div>
        );
    }

    return (
        <div className="dashboardS-wraaper container mt-5">
            <h2 className="text-center mb-4">Liste des demandes de produits</h2>
            <div className="mt-4 recherche-wrapper rounded shadow w-1/4 m-2">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h1 className="d-inline">Demandes (1) </h1> 
                    </div>
                    <div className="col-3">
                        <select id="statusFilter" className="form-select">
                            <option value="">Tous les statuts</option>
                            <option value="actif">Actif</option>
                            <option value="inactif">Inactif</option>
                            <option value="en_attente">En attente</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary" style={{ width: '90%' }}>Appliquer les filtres</button>
                    </div>
                </div>
            </div>
            {requests.length === 0 ? (
                <p>Aucune demande trouvée.</p>
            ) : (
                <table className="supplier-table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Prix Total</th>
                            <th>Produits</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>{request._id}</td>
                                <td>
                                    <span className={request.status === 'en_preparation' ? 'product-active' : 'product-inactive'}>
                                        {request.status}
                                    </span>
                                </td>
                                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                                <td>{request.totalPrice.toFixed(2)} DH</td>
                                <td>
                                    <ul className="list-unstyled">
                                        {request.products.map((productItem) => (
                                            <li key={productItem.productId._id}>
                                                {productItem.productId.nom} - Quantité: {productItem.quantity} - Prix: {productItem.productId.prix.toFixed(2)} dh
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={request.status}
                                        onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                    >
                                        <option value="en_preparation">En préparation</option>
                                        <option value="ramasse">Ramassé</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SupplierOrder;
