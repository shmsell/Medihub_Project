import React, { useState, useEffect } from 'react';

const AddProductRequest = () => {
    const [products, setProducts] = useState([]); // État pour stocker les produits disponibles
    const [selectedProducts, setSelectedProducts] = useState([]); // État pour stocker les produits sélectionnés
    const [quantities, setQuantities] = useState({}); // État pour stocker la quantité de chaque produit
    const [totalPrice, setTotalPrice] = useState(0); // État pour le prix total
    const [message, setMessage] = useState(''); // État pour les messages de succès ou d'erreur

    // Fonction pour récupérer les produits de l'API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/accepted');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProducts(data);
                // Initialiser les quantités à 1 pour chaque produit
                const initialQuantities = {};
                data.forEach(product => {
                    initialQuantities[product._id] = 1; // Chaque produit commence avec 1 unité
                });
                setQuantities(initialQuantities);
            } catch (error) {
                setMessage(error.message);
            }
        };
        fetchProducts();
    }, []);

    // Fonction pour gérer la sélection d'un produit
    const handleProductSelection = (productId) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.includes(productId)) {
                // Si le produit est déjà sélectionné, le désélectionner
                return prevSelectedProducts.filter(id => id !== productId);
            } else {
                // Sinon, ajouter le produit aux produits sélectionnés
                return [...prevSelectedProducts, productId];
            }
        });
    };

    // Fonction pour gérer le changement de quantité pour un produit spécifique
    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: newQuantity,
        }));

        updateTotalPrice(); // Mettre à jour le prix total
    };

    // Fonction pour mettre à jour le prix total
    const updateTotalPrice = () => {
        let newTotalPrice = 0;
        products.forEach(product => {
            if (selectedProducts.includes(product._id)) {
                newTotalPrice += product.prix * (quantities[product._id] || 1);
            }
        });
        setTotalPrice(newTotalPrice);
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            products: selectedProducts.map(productId => ({
                productId,
                quantity: quantities[productId]
            })),
        };

        try {
            const response = await fetch('http://localhost:5000/api/Request/product-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Demande de produit ajoutée avec succès.');
                setSelectedProducts([]); // Réinitialiser la sélection
                setQuantities({});
                setTotalPrice(0);
            } else {
                setMessage(data.message || 'Erreur lors de l\'ajout de la demande.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setMessage('Erreur de connexion au serveur.');
        }
    };

    return (
        <div className='order-wrapper'>
            <form onSubmit={handleSubmit}>
                <div>
                    <table className='order-table'>
                        <thead>
                            <tr>
                                <th><input
                                            type="checkbox"
                                        /></th>
                                <th>Photo</th>
                                <th>Nom du produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product._id)}
                                            onChange={() => handleProductSelection(product._id)}
                                        />
                                    </td>
                                    <td>
              <img src={`http://localhost:5000/uploads/${product.coverPhoto}`} alt={product.nom} className="img-fluid" style={{ width: '50px', height: '50px' }} />
            </td>
            <td>{product.nom}</td>

                                    <td>{product.prix ? product.prix.toFixed(2) : 'Prix non disponible'} Dh</td>
                                    <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
        type="button"
        onClick={() => handleQuantityChange(product._id, Math.max((quantities[product._id] || 1) - 1, 1))}
        disabled={!selectedProducts.includes(product._id) || (quantities[product._id] || 1) <= 1}
        style={{
            backgroundColor: '#1cb3e4',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            marginRight: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            color:'white',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
    >
        -
    </button>
    <span style={{ margin: '0 10px', fontSize: '16px' }}>{quantities[product._id]}</span>
    <button
        type="button"
        onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
        disabled={!selectedProducts.includes(product._id)}
        style={{
            backgroundColor: '#1cb3e4',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            marginLeft: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            color:'white',

        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
    >
        +
    </button>
</div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           
            {message && <p>{message}</p>}
            <div className='text-end'>  
                    <label>Prix Total :</label>
                    <span>{totalPrice.toFixed(2)} Dh</span>
                    <button type="submit"className='btn border 0' style={{ margin:'10px' ,fontSize:'15px' ,background:'#1cb3e4' , color:'white'}}disabled={selectedProducts.length === 0}>Demander le produit</button>

                </div>
                </form>
        </div>
    );
};

export default AddProductRequest;
