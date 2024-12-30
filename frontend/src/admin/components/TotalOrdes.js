// ProductCount.js
import React, { useEffect, useState } from 'react';

const TotalOrders = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/countOrders'); // Remplacez par l'URL correcte de votre API
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du nombre de commandes.');
                }
                const data = await response.json();
                setCount(data.orderCount); // Correction pour utiliser "orderCount" tel qu'il est renvoyé par l'API
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderCount();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap justify-between mb-6">
            {/* Bloc de statistique */}
            <div className="dashboard-static p-4 rounded shadow w-1/4 m-2" style={{background:"#d4edda"}}>
                <h2 className="text-lg">Total des commandes</h2>
                <h6>Depuis la semaine dernière : <span className="text-green-600">{count}</span></h6> {/* Affichage du nombre de commandes */}
            </div>
        </div>
    );
};

export default TotalOrders;
