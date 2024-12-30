// src/components/MonthlySalesChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const MonthlySalesChart = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [totalSales, setTotalSales] = useState(0); // État pour le total des ventes

    const fetchMonthlySales = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders/monthlySales');
            console.log(response.data); // Vérifiez ce que votre API renvoie

            const { sales, months, totalSales } = response.data; // Assurez-vous que votre API renvoie ces données

            setMonthlyData(sales); // Met à jour les données mensuelles
            setLabels(months); // Met à jour les étiquettes des mois
            setTotalSales(totalSales); // Met à jour le total des ventes
        } catch (error) {
            console.error("Erreur lors de la récupération des ventes mensuelles", error);
        }
    };

    useEffect(() => {
        fetchMonthlySales(); // Appelle la fonction pour récupérer les données au chargement du composant
    }, []);

    const data = {
        labels: labels, // Étiquettes des mois
        datasets: [
            {
                label: 'Ventes Mensuelles',
                data: monthlyData, // Données des ventes
                fill: false, // Ne remplit pas la zone sous la ligne
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(4, 35, 69, 0.7)' ,
                borderWidth: 2, // Épaisseur de la ligne
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Montant Total (€)', // Titre de l'axe Y
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Mois', // Titre de l'axe X
                },
            },
        },
    };

    return (
        <div>
            <h2 className='static-titre'> Ventes Mensuelles</h2>
            <Line data={data} options={options} /> {/* Affiche le graphique linéaire */}
        </div>
    );
};

export default MonthlySalesChart;
