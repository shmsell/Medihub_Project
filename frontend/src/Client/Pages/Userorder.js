import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link pour la navigation

const Userorder = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        address: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/currentUser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des informations utilisateur');
                }

                const data = await response.json();
                setUser(data);
                setFormData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    mobile: data.mobile,
                    address: data.address || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour des informations utilisateur');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setError(null); // Réinitialiser l'erreur
            alert('Informations mises à jour avec succès');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="text-center">Chargement...</div>;
    }

    if (error) {
        return <div className="text-danger">Erreur : {error}</div>;
    }

    return (
        <div className="profil-wrapper home-wrappe-2 container mt-5">
            <div className='row'>
                <div className='col-4'>
                    <div className='layout'>
                        <h3>Menu</h3>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/user/profile" className="text-decoration-none">Gérer Profil</Link>
                            </li>
                            <li>
                                <Link to="/user/orders" className="text-decoration-none">Mes Commandes</Link>
                            </li>
                            <li>
                                <Link to="/user/returns" className="text-decoration-none">Mes Retours</Link>
                            </li>
                            <li>
                                <Link to="/logout" className="text-decoration-none" style={{color:'#1cb3e4'}}>Déconnexion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-8'>
                    <div className="information-wrapper container">
                        <div className='profil-title'>
                            <h2 className="text-center">Votre Profil</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Prénom :</label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            className="form-control"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Nom de famille :</label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            className="form-control"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>E-mail :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="form-group">
                                        <label>Téléphone :</label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            className="form-control"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Mot de passe actuel :</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="form-control"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nouveau mot de passe :</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirmer le mot de passe :</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-4 text-end ">
                                <button type="button" className="button border 0 me-2" style={{background:'#1cb3e4'}}>Annuler</button>
                                <button type="submit" className="button border 0">Enregistrer les modifications</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userorder;
