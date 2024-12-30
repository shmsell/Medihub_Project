import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Gérer la connexion réussie (par exemple, redirection ou stockage du token)
        navigate('/SingupUser'); // Redirection vers le tableau de bord ou la page souhaitée
      } else {
        // Gérer les erreurs de connexion
        setError(data.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    }
  };

  return (
    <div className="login-wrapper py-5 home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Se Connecter</h3>
            <form className="d-flex flex-column gap-30" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-1">
                <input 
                  type="password" 
                  name="password"
                  placeholder="Mot de passe"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                <button type="submit" className="button border-0">Connecter</button>
                <Link className="button signup" to="/SingupUser">Inscription</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
