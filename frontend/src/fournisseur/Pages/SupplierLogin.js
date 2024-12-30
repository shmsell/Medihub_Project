import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Début du chargement

        try {
            const response = await fetch('http://localhost:5000/api/supplier/loginSupplier', { // Assurez-vous que l'URL est correcte
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, motDePasse }),
            });

            if (response.ok) {
                // Connexion réussie
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/SupplierDashboard'); // Redirige vers la page d'accueil ou de tableau de bord
            } else if (response.status === 401) {
                // Gestion des informations de connexion invalides
                setError('Identifiants invalides.');
            } else if (response.status === 403) {
                // Gestion du cas où le compte est rejeté
                const data = await response.json();
                setError(data.error || 'Votre compte a été rejeté. Contactez-nous pour plus d\'informations.');
            } else {
                // Gestion des autres erreurs
                setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false); // Fin du chargement
        }
    };

    return (
        <div className="login-wrapper py-5 home-wrapper-2">
         <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h1 className="text-center mb-3">Connexion</h1>
            <form className='d-flex flex-column gap-30' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="motDePasse" className="form-label">Mot de passe:</label>
                    <input
                        type="password"
                        id="motDePasse"
                        className="form-control"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className='mt-3 d-flex justify-content-center align-items-center gap-15'>
                <button type="submit" className="button border-0" disabled={loading}>
                    {loading ? 'Chargement...' : 'Se connecter'}
                </button>
                <Link className="button signup" to="/SupplierSingup">Inscription</Link>
                </div>
             

            </form>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Login;
