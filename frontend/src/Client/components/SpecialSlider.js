import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import './BeautySection.css'; // Pour les styles personnalisés

const BeautySection = () => {
    const products = [
        {
            name: 'DocMorris Vision 60 Gélules',
            price: '12,75€',
            oldPrice: '15,10€',
            discount: '-16%',
            img: 'path_to_image1.jpg',
        },
        {
            name: 'DocMorris Collagène Plus 30 Sachets',
            price: '20,95€',
            oldPrice: '27,04€',
            discount: '-23%',
            img: 'path_to_image2.jpg',
        },
        {
            name: 'DocMorris Sélénium ACE 30 Comprimés',
            price: '6,25€',
            oldPrice: '7,41€',
            discount: '-16%',
            img: 'path_to_image3.jpg',
        },
        {
            name: 'DocMorris Charbon Actif + Acidophilus',
            price: '7,75€',
            oldPrice: '9,18€',
            discount: '-16%',
            img: 'path_to_image4.jpg',
        },
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="beauty-section">
                        <h2>Révolutionnez votre beauté</h2>
                        <img src="path_to_main_image.jpg" alt="Révolutionnez votre beauté" className="img-fluid" />
                        <button className="btn btn-primary mt-3">Voir tout</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-slider">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={2} // Nombre d'éléments visibles en même temps
                            navigation
                            pagination={{ clickable: true }}
                        >
                            {products.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div className="product-card">
                                        <img src={product.img} alt={product.name} className="img-fluid" />
                                        <h5>{product.name}</h5>
                                        <p>
                                            <span className="price">{product.price}</span>{' '}
                                            <span className="old-price">{product.oldPrice}</span>{' '}
                                            <span className="discount">{product.discount}</span>
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeautySection;
