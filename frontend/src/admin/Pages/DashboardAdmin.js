import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import MonthlySalesChart from '../components/monthsales';
import ProductCount from '../components/totalProduct';
import Orderdashboard from '../components/OrderDashboard';
import TotalSupplier from '../components/TotalSupplier';
import TotalOrdes from '../components/TotalOrdes';
const DashboardAdmin = () => {
  const [chartData, setChartData] = useState(null);

  const fetchOrderData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/ordersDay');
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const labels = data.map(order => order._id);
        const totalOrders = data.map(order => order.totalOrders);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Commandes par jour',
              data: totalOrders,
              backgroundColor: 'rgba(0, 123, 255, 0.7)',
              borderColor: 'rgba(4, 35, 69, 0.7)' ,
              borderWidth: 1,
              barThickness: 30,
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
    fetchOrderData();
  }, []);

  if (!chartData) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="dashboard-wrapper ">
         <div className="container-xxl">
         <div className="row">
        <h1 className="dashboard-title mb-4">Tableau de bord Administrateur</h1>
        <hr/>
        <div className='col-4'> 
        <ProductCount />
          </div>
          <div className='col-4'> 
          <TotalSupplier />

          </div>
          <div className='col-4'> 
          <TotalOrdes />


          </div>


          
          


          {/* Section du graphique */}
  
        </div>



       

      <div className="row mt-8">
      <div className='col-6'>
      <div className=" bg-white p-4 rounded shadow w-1/2 m-2">
            <h2 className='static-titre'>Commande par jour</h2>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
          </div>  
          <div className='col-6'>
      <div className="bg-white p-4 rounded shadow w-1/2 m-2">
            <MonthlySalesChart />
          </div>
          </div>  
          <div className="row">
          <div className='col-12'>
 
        <div className="p-4 flex justify-center items-center min-h-screen">
          <h2 className="text-lg mb-2  ">Liste des commandes</h2>
          <Orderdashboard/>
        </div>
        </div>
      </div>
      </div>

      </div>
      </div>

  );
};

export default DashboardAdmin;
