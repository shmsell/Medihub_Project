import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 // Importez les modules nécessaires

const LatestAcceptedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchLatestAcceptedProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products/getLatest');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des produits');
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestAcceptedProducts();
    }, []);

    if (loading) {
        return <p>Chargement des produits...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleProductClick = (productId) => {
        console.log('Navigating to product ID:', productId);
        navigate(`/product/${productId}`);
    };

    return (

            <Swiper
                spaceBetween={10} // Espace entre les diapositives
                slidesPerView={4} // Nombre de diapositives visibles
                navigation={true} // Activer la navigation
                pagination={{ clickable: true }} // Pagination cliquable
                loop={true} // Boucle à l'infini
                modules={[Navigation, Pagination]} // Modules utilisés
            >
                {products.length > 0 ? (
                    products.map((product) => {
                        const prixFinal = product.prix * 1.6; // Calculez le prix final

                        return (
                            <SwiperSlide key={product._id}>
                                <div className="product-card" onClick={() => handleProductClick(product._id)}>
                                    {/* Action Bar for Wishlist */}
                                    <div className="action-bar">
                                        <div className="icon">
                                            <FaHeart className="wishlist-icon" />
                                        </div>
                                    </div>

                                    {/* Product Image */}
                                    <img
                                        src={`http://localhost:5000/uploads/${product.coverPhoto}`}
                                        alt={product.nom}
                                        className="card-img-top product-image"
                                    />

                                    {/* Product Details */}
                                    <div className="product-details">
                                        <h5 className="title">{product.nom}</h5>
                                        <h6 className="seller">Livraison Maroc</h6>
                                        <h6 className="seller">Flexibilité de paiement</h6>

                                        {/* Product Price and Add to Cart */}
                                        <div className="price-cart">
                                            <p className="price-tag">{prixFinal.toFixed(2)} Dh</p>
                                            <div className="cart-icon-container">
                                                <MdOutlineShoppingCart className="cart-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <p>Aucun produit trouvé.</p>
                )}
            </Swiper>
  
    );
};

export default LatestAcceptedProducts;
