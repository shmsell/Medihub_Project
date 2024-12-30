// ProductCount.js
import React, { useEffect, useState } from 'react';


const TotalSupplier = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/supplier/countSuppliers'); // Remplacez par l'URL correcte de votre API
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
        <div className="dashboard-static p-4  shadow w-1/4 m-2" style={{background:"#f8d7da"}} >
          <h2 className="text-lg">Total des fournisseur</h2>
          <h6>Depuis la semaine dernière : <span className="text-green-600 blod">{count}</span></h6>
        </div>
         </div>
      
    );
};

export default TotalSupplier;
