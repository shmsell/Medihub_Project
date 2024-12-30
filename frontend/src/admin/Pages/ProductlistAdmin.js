import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; 

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/accept/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(product => product._id === id ? updatedProduct.product : product));
      } else {
        const error = await response.json();
        alert('Erreur lors de l\'acceptation du produit: ' + error.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du produit', error);
      alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/reject/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(product => product._id === id ? updatedProduct.product : product));
      } else {
        const error = await response.json();
        alert('Erreur lors du rejet du produit: ' + error.message);
      }
    } catch (error) {
      console.error('Erreur lors du rejet du produit', error);
      alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  };

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="productlist-wrpper home-wrapper-2 mt-4">
      <div class="container mt-4 recherche-wrapper">
    <div class="row align-items-center">
    <div class="col-6">
            <h1 class="d-inline">Product (10)</h1> 
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
    <table className="product-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Nom</th>
          <th>Statut</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Catégorie</th>
          <th>Fournisseur</th>
        
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>
              <img src={`http://localhost:5000/uploads/${product.coverPhoto}`} alt={product.nom} className="img-fluid" style={{ width: '50px', height: '50px' }} />
            </td>
            <td>{product.nom}</td>
            <td>
        {product.statut === 'accepté' && <span className="product-active">Active</span>}
        {product.statut === 'rejeté' && <span className="product-inactive">Inactive</span>}
        {product.statut === 'en_attente' && <span className="product_attente">en_attente</span>}
        {/* Ajoutez d'autres statuts si nécessaire */}
      </td>
            <td>{product.description}</td>
            <td>{product.prix}</td>
            <td>{product.category.nom}</td>
            <td>{product.supplier.nomEntreprise}</td>

            <td>
                <span 
                  onClick={() => handleAccept(product._id)} 
                  className="icon-Accepter" 
                  title="Accepter"
                >
                  <FaCheck />
                </span>
                <span 
                  onClick={() => handleReject(product._id)} 
                  className="icon-Rejeter ms-2" 
                  title="Rejeter"
                >
                  <FaTimes  />
                </span>
              </td>
  
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default ProductListAdmin;
