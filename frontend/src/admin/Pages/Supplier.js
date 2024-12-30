import React, { useEffect, useState } from 'react';

import { FaCheck, FaTimes } from 'react-icons/fa'; 


const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/supplier/getAllSuppliers');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const result = await response.json();
                if (Array.isArray(result)) {
                    setSuppliers(result);
                } else {
                    throw new Error('La réponse de l\'API n\'est pas un tableau.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleAccept = async (supplierId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/supplier/accept/${supplierId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            setSuppliers(suppliers.map(supplier =>
                supplier._id === supplierId ? { ...supplier, statut: 'accepté' } : supplier
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleReject = async (supplierId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/supplier/reject/${supplierId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            setSuppliers(suppliers.map(supplier =>
                supplier._id === supplierId ? { ...supplier, statut: 'rejeté' } : supplier
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Chargement des fournisseurs...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="supplier-wrapper  mt-4">
            <div class="container mt-4 recherche-wrapper">
    <div class="row align-items-center">
    <div class="col-6">
            <h1 class="d-inline">Fournisseur (2) </h1> 
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
            
            
            <table className="supplier-table table-striped">
                <thead>
                    <tr>
                        <th>Nom de l'entreprise</th>
                        <th>Statut</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier._id}>
                            <td>{supplier.nomEntreprise}</td>

                            <td>
        {supplier.statut=== 'accepté' && <span className="product-active">Active</span>}
        {supplier.statut === 'rejeté' && <span className="product-inactive">Inactive</span>}
        {supplier.statut === 'en_attente' && <span className="product_attente">en_attente</span>}
      </td>
                            <td> {supplier.email}</td>
                            <td>{supplier.numeroTelephone}</td>
                            <td>
                                <span className="icon-Accepter  me-2" onClick={() => handleAccept(supplier._id)}>    <FaCheck /></span>
                                <span className="icon-Rejeter me-2" onClick={() => handleReject(supplier._id)}>    <FaTimes /></span>

                           </td>  
   

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Supplier;
