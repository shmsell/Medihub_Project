import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correct de createRoot
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root')); // Utilisation de createRoot
root.render(
    <App />
);