import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Gérer la connexion réussie (par exemple, redirection ou stockage du token)
        localStorage.setItem('token', data.token);
        navigate('/Productlist'); // Redirection vers le tableau de bord ou la page souhaitée
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
          <div className="auth-card">
          <div class="d-flex justify-content-center py-4">
            <img class="" src="images/MediLogo.png" alt="" />
             </div>
            <h3 className="text-center mb-3">Se Connecter</h3>
            <form className="d-flex flex-column gap-30" onSubmit={handleSubmit}>
              <div className="input-group mb-3" >
              <span className="input-group-text p-3" id="basic-addon2">
                  <MdEmail className="fs-6" style={{ color: '#1cb3e4' }}/>
                </span>
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
              <div className="input-group mt-1">
              <  span className="input-group-text p-3" id="basic-addon2">
                  <RiLockPasswordFill className="fs-6" style={{ color: '#1cb3e4' }}/>
                </span>
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
                <Link className="button signup" to="/singupUser" style={{ background: '#1cb3e4' }}>Inscription</Link>
              </div>
            </form>
          </div>
        </div>
  );
};

export default Login;
