import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/all');
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

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="dashboardS-wraaper container mt-5">
      <h2 className="text-center mb-4">Liste des produits</h2>

      <div class=" mt-4 recherche-wrapper rounded shadow w-1/4 m-2">
    <div class="row align-items-center">
    <div class="col-6">
            <h1 class="d-inline">Produit(10) </h1> 
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
            <button class="btn btn-primary" style={{width:'90%'}}>Appliquer les filtres</button>
        </div>
    </div>
</div>
      <table className="supplier-table table-bordered">
        <thead className="thead-dark">
          <tr>
             <th>Photo</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Statut</th>  
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
                           <td>
                <img
                  src={`http://localhost:5000/uploads/${product.coverPhoto}`}
                  alt={product.nom}
                  style={{ height: '50px', objectFit: 'cover' }}
                />
                 </td>
              <td>{product.nom}</td>
              <td>{product.description}</td>
              <td>{product.prix}</td>
              <td>{product.category.nom}</td>
              <td>
        {product.statut === 'accepté' && <span className="product-active">Active</span>}
        {product.statut === 'rejeté' && <span className="product-inactive">Inactive</span>}
        {product.statut === 'en_attente' && <span className="product_attente">en_attente</span>}
      </td>

             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
