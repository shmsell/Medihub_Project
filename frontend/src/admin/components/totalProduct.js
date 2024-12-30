// ProductCount.js
import React, { useEffect, useState } from 'react';

const ProductCount = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/countProducts'); // Remplacez par l'URL correcte de votre API
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du nombre de produits.');
                }
                const data = await response.json();
                setCount(data.count);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCount();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap justify-between mb-6" >
        {/* Blocs de statistiques */}
        <div className="dashboard-static p-4 rounded shadow w-1/4 m-2" style={{background:"#fff3cd"}}>
          <h2 className="text-lg">Total des Produit</h2>
          <h6>Depuis la semaine dernière : <span className="text-green-600">{count}</span></h6>
        </div>
         </div>
      
    );
};

export default ProductCount;
