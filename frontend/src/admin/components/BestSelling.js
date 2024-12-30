import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BestSellingProductsChart = () => {
    const [chartData, setChartData] = useState(null); // État pour les données du graphique

    const fetchBestSellingProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/topProduct');
            const data = await response.json();

            // Vérifie si les données existent et ont la bonne structure
            if (data && Array.isArray(data)) {
                const labels = data.map(product => product.name);
                const totalSold = data.map(product => product.totalSold);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Produits les plus vendus',
                            data: totalSold,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        }
                    ]
                });
            } else {
                console.error('Données au format inattendu :', data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchBestSellingProducts();
    }, []);

    if (!chartData) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div>
            <h2>Produits les Plus Vendus</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default BestSellingProductsChart;
