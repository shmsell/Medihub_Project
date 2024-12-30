import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Liste des catégories
const categories = [
  { name: 'Appareil éléctronique et Diabèt', imgSrc: 'images/catégorie6.png' },
  { name: 'Orthopédie', imgSrc: 'images/catégorie1.png' },
  { name: 'Respiratoire', imgSrc: 'images/catégorie9.png' },
  { name: 'Appareil diabète', imgSrc: 'images/catégorie3.png' },
  { name: 'Cosmétiques et bien-être', imgSrc: 'images/catégorie4.jpg' },
  { name: 'Consommables médicaux', imgSrc: 'images/catégorie5.png' },
  { name: 'Mobilier médical', imgSrc: 'images//catégorie7.png' },
  { name: 'Hygiène et désinfection', imgSrc: 'images/catégorie5.jpg' },
  { name: 'Mobilier médical', imgSrc: 'images/catégorie5.jpg' },
  { name: 'Mobilier médical', imgSrc: 'images/catégorie5.jpg' },
  { name: 'Mobilier médical', imgSrc: 'images/catégorie5.jpg' },


];


const CategorySlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={6}
      slidesPerView={8}
    >
      {categories.map((category, index) => (
        <SwiperSlide key={index}>
          <div className="category-item">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="category-circle"

            />
            <h6>{category.name}</h6>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorySlider;
