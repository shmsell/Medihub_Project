import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    localStorage.removeItem('token');
    navigate('/'); // Rediriger vers la page d'accueil
  };

  return (
    <Link 
      to="/logout" 
      className="text-decoration-none" 
      style={{ color: '#1cb3e4' }} 
      onClick={handleLogout}
    >
      Déconnexion
    </Link>
  );
};

export default Logout;
