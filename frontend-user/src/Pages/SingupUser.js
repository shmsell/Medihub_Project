import React, { useState } from 'react'; 
import { Link } from "react-router-dom";

const Signupuser = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        password: ''
    });

    const { firstname , lastname , mobile, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('User registered:', data);
                // Afficher un message de succès ou rediriger
            } else {
                console.error('Error:', data);
                // Afficher un message d'erreur
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">S'inscrire</h3>
                        <form className="d-flex flex-column gap-30" onSubmit={onSubmit}>
                            <div>
                                <input 
                                    type="text" 
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChange}
                                    placeholder="Prénom"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                    placeholder="Nom"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="mobile"
                                    value={mobile}
                                    onChange={onChange}
                                    placeholder="Numéro téléphone"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="Email"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mt-1">
                                <input 
                                    type="password" 
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Mot de passe"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                <button type="submit" className="button border-0">Inscription</button>
                                <Link className="button signup" to="/login">Se connecter</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signupuser;
