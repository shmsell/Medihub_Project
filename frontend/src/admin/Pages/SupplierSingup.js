import React, { useState } from 'react'; 
import { Link } from "react-router-dom";

const SupplierSignup = () => {
    const [formData, setFormData] = useState({
        nomEntreprise: '',
        email: '',
        numeroTelephone: '',
        adresse: '',
        motDePasse: '',
    });

    const [message, setMessage] = useState(''); // État pour le message de succès ou d'erreur

    const { nomEntreprise, email, numeroTelephone, adresse ,motDePasse } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/supplier/registerSupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('User registered:', data);
                setMessage('Inscription réussie. Un administrateur doit approuver votre compte.');
            } else {
                console.error('Error:', data);
                setMessage(`Erreur: ${data.message || 'Une erreur est survenue lors de l\'inscription.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erreur: Une erreur est survenue lors de l\'inscription.');
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
                                    name="nomEntreprise"
                                    value={nomEntreprise}
                                    onChange={onChange}
                                    placeholder="Nom de l'entreprise"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="numeroTelephone"
                                    value={numeroTelephone}
                                    onChange={onChange}
                                    placeholder="numero Telephone"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="adresse"
                                    value={adresse}
                                    onChange={onChange}
                                    placeholder="adresse"
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
                                    name="motDePasse"
                                    value={motDePasse}
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
                        {message && <p className="text-center mt-3">{message}</p>} {/* Afficher le message */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierSignup;
