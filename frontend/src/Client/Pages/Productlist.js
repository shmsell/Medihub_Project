import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate
import ProduitSection from "../components/ProduitSection";
import Breadcrumb from "../components/Breadcrumb";

const Productlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialisation du hook useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/accepted'); // Modifiez l'URL selon votre endpoint
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    // Gestion des erreurs et du chargement
    if (loading) return <p>Chargement des produits...</p>;
    if (error) return <p>Erreur: {error}</p>;

    // Fonction pour gérer le clic sur un produit
    const handleProductClick = (productId) => {
        console.log('Navigating to product ID:', productId);
        navigate(`/product/${productId}`);
      
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Liste des Produits</title>
                <link rel="canonical" href="http://mysite.com/productlist" />
            </Helmet>
            <Breadcrumb title="Liste des Produits" />
            <div className="store-wrapper home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Acheter par catégories</h3>
                                <div>
                                    <ul className="ps-0">
                                        <li>Produits de Soin et Hygiène</li>
                                        <li>Consommable Dentaire</li>
                                        <li>Mobilité et Maintien à domicile</li>
                                        <li>Orthopédie</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Prix</h3>
                                <div>             
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-floating mb-3">
                                            <input type="number" className="form-control" id="minPrice" placeholder="Min" />
                                            <label htmlFor="minPrice">Min</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="number" className="form-control" id="maxPrice" placeholder="Max" />
                                            <label htmlFor="maxPrice">Max</label>
                                        </div> 
                                    </div>                       
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="filter-sort-grid">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0">Trier par :</p>
                                    <select name="sort-by" id="SortBy" className="fact-filters__sort select__select">
                                        <option value="price-asc">Prix croissant</option>
                                        <option value="price-desc">Prix décroissant</option>
                                        <option value="name-asc">Nom A-Z</option>
                                        <option value="name-desc">Nom Z-A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-list pb-5">
                                {/* Utilisation de ProduitSection et gestion du clic sur les produits */}
                                <ProduitSection products={products} onProductClick={handleProductClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Productlist;
