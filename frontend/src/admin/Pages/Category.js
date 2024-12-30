import React, { useEffect, useState } from 'react';
import { MdSearch, MdModeEdit ,MdDelete } from 'react-icons/md';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ nom: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    
    const filteredCategories = categories.filter(category =>
        category.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/category/all');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const result = await response.json();
                setCategories(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/category/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            setCategories([...categories, result]);
            setNewCategory({ nom: '', description: '' });
            setMessage('Catégorie ajoutée avec succès!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdateCategory = async (id) => {
        try {
            const updatedCategory = categories.find(category => category._id === id);
            const response = await fetch(`http://localhost:5000/api/category/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            setCategories(categories.map(category => category._id === id ? result : category));
            setMessage('Catégorie mise à jour avec succès!');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/category/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            setCategories(categories.filter(category => category._id !== id));
            setMessage('Catégorie supprimée avec succès!');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Chargement des catégories...</p>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="category-wrapper mt-4">
            <h1 className="mb-4">Gestion des Catégories</h1>
            <hr />
            <div className='row'>
                <div className='col-md-4'>
                    {message && <p className="alert alert-success">{message}</p>}
                    <div className="add-category-wrapper mb-4 p-3 border rounded shadow">
                        <p>Gérez vos catégories de produits ici. Vous pouvez les ajouter, modifier ou supprimer.</p>
                        <h2>Ajouter une nouvelle catégorie</h2>
                        <div className="mb-3">
                            <label>Nom</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nom"
                                value={newCategory.nom}
                                onChange={(e) => setNewCategory({ ...newCategory, nom: e.target.value })}
                            />
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            />
                            <button onClick={handleAddCategory}className="btn " style={{ width: '150px' ,marginTop:'10px' ,fontSize:'15px' ,background:'#1cb3e4',color:'white', fontStyle:'blod'}}>Ajouter</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className="input-group mt-1">
                    <  span className="input-group-text p-3" id="basic-addon2">
                  <MdSearch className="fs-6" style={{ color: '#1cb3e4' }}/>
                </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher par nom de catégorie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        {filteredCategories.length === 0 ? (
                            <p>Aucune catégorie trouvée.</p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setCategories(categories.map(category => ({
                                                        ...category,
                                                        selected: isChecked,
                                                    })));
                                                }}
                                            />
                                        </th>
                                        <th>Nom</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map(category => (
                                        <tr key={category._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={category.selected || false}
                                                    onChange={() =>
                                                        setCategories(categories.map(c =>
                                                            c._id === category._id ? { ...c, selected: !c.selected } : c
                                                        ))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={category.nom}
                                                    onChange={(e) =>
                                                        setCategories(categories.map(c =>
                                                            c._id === category._id ? { ...c, nom: e.target.value } : c
                                                        ))
                                                    }
                                                />
                                            </td>
                                            <td>{category.description}</td>
                                            <td>
                                                <MdModeEdit
                                                    onClick={() => handleUpdateCategory(category._id)}
                                                    className="me-2"
                                                    style={{ cursor: 'pointer',  }}
                                                />
                                                <MdDelete
                                                    onClick={() => handleDeleteCategory(category._id)}
                                                    style={{ cursor: 'pointer', color: 'red' }}

                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
