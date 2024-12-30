import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaPlusCircle, FaListAlt, FaBoxOpen, FaUserCog } from 'react-icons/fa'; // Import des icônes
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importation de Chart.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  const handleAddProduct = () => {
    navigate('/product');
  };

  const handleProductList = () => {
    navigate('/Supplierlistproduct');
  };

  const handleOrders = () => {
    navigate('/Supplierorder');
  };

  const handleProfileManagement = () => {
    navigate('/SupplierProfile');
  };

  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Request/requests-day'); // Remplacez par votre endpoint
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const result = await response.json();
        const labels = result.map(item => item._id); // Dates
        const data = result.map(item => item.count); // Nombre de demandes

        setChartData({ labels, data });
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    fetchRequestsData();
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Demandes de produits par jour',
        data: chartData.data,
        fill: false,
        borderColor: '#1cb3e4',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="Supplier-dashboard-wrapper">
      <div className="container-xxl">
        <h1 className="dashboard-title mb-4">Espace Fournisseur</h1>
        
        <div className="row">
          {/* Ajouter un produit */}
          <div className="col-md-3 mb-3">
            <div 
              className="dashboard-card p-4 bg-blue-100 rounded shadow text-center"
              onClick={handleAddProduct} 
              style={{ cursor: 'pointer' }}
            >
              <FaPlusCircle size={40} className="mb-2" style={{ color: '#1cb3e4' }} />
              <h2 className="text-lg">Ajouter Produit</h2>
            </div>
          </div>

          {/* Liste des produits */}
          <div className="col-md-3 mb-3">
            <div 
              className="dashboard-card p-4 bg-blue-100 rounded shadow text-center"
              onClick={handleProductList} 
              style={{ cursor: 'pointer' }}
            >
              <FaListAlt size={40} className="mb-2" style={{ color: '#1cb3e4' }} />
              <h2 className="text-lg">Liste des Produits</h2>
            </div>
          </div>

          {/* Commandes */}
          <div className="col-md-3 mb-3">
            <div 
              className="dashboard-card p-4 bg-blue-100 rounded shadow text-center"
              onClick={handleOrders} 
              style={{ cursor: 'pointer' }}
            >
              <FaBoxOpen size={40} className="mb-2" style={{ color: '#1cb3e4' }} />
              <h2 className="text-lg">Commandes</h2>
            </div>
          </div>

          {/* Gérer le profil */}
          <div className="col-md-3 mb-3">
            <div 
              className="dashboard-card p-4 bg-blue-100 rounded shadow text-center"
              onClick={handleProfileManagement} 
              style={{ cursor: 'pointer' }}
            >
              <FaUserCog size={40} className="mb-2" style={{ color: '#1cb3e4' }} />
              <h2 className="text-lg">Gérer le Profil</h2>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {/* Graphique des demandes */}
          <div className="graphe col-md-8 mb-4">
            <h2 className="text-lg">Demandes de Produits par Jour</h2>
            <Line data={data} options={{ responsive: true }} />
          </div>
         
          {/* Blocs de statistiques */}
          <div className="col-md-4">
            <div className="dashboard-static p-4 rounded shadow mb-3" style={{background:"#d5f1f070"}}>
              <h2 className="text-lg" style={{fontSize:'18px'}}>Total des Produits</h2>
              <span className="text-green-600">10</span>
              <p> incluant à la fois les actifs et les inactifs</p>
            </div>

            <div className="dashboard-static p-4 rounded shadow mb-3" style={{background:"#d5f1f070"}}>
              <h2 className="text-lg" style={{fontSize:'18px'}}>Total des Produits Inactifs</h2>
              <span className="text-green-600">2</span>
              <p> produits qui ne sont pas actuellement en vente ou visibles </p>
            </div>

            <div className="dashboard-static p-4 rounded shadow" style={{background:"#7ebdf970"}}>
              <h2 className="text-lg"  style={{fontSize:'18px'}}>Total des Produits Actifs</h2>
              <span className="text-green-600">8</span>
              <p>produits actuellement disponibles et gérés dans le système.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
