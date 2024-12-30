import React from "react";
import { Link } from "react-router-dom";
import { BsCreditCard2Back } from "react-icons/bs";
import SpecialProduct from "../components/SpecialProduct";
import LatestAcceptedProducts from "../components/LastProduit";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import CategorySlider from "../components/CategorySlider";
import "swiper/css"; // Importer le style principal
import "swiper/css/navigation"; // Importer le style pour la navigation
import "swiper/css/pagination"; // Importer le style pour la pagination



const Home =() =>{
    return (
        <>
        <section className="home-wrapper-1 py-5 container">
         <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <div className="main-banner position-relative ">
                        <img src="images/photo1.png" alt="" className="img-fluid rounded-3" />
                        <div className="main-banner-content position-absolute">
                            <h4>MediHub</h4>
                            <h5>Offre exclusive</h5>
                            <p>Profitez d'une offre exclusive pour <br/>équiper votre établissement médical.</p>
                            <Link to="/" className="button">Achter Maintenant</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                 <div className="d-flex flex-wrap  gap-10 justify-content-between align-items-center">
                    <div className="samll-banner position-relative ">
                        <img src="images/photo5.png" alt="" className="img-fluid rounded-3" />
                        <div className="small-banner-content position-absolute">
                            <h4>MediHub</h4>
                            <h5>Best-sellers</h5>
                        </div>
                    </div>
                    <div className="samll-banner position-relative ">
                        <img src="images/photo2.png" alt="" className="img-fluid rounded-3" />
                        <div className="small-banner-content position-absolute">
                            <h4>MediHub</h4>
                            <h5>Nouveau en <br/> stock</h5>
                            <p></p>
                        </div>
                    </div>
                    <div className="samll-banner position-relative ">
                        <img src="images/photo3.png" alt="" className="img-fluid rounded-3" />
                        <div className="small-banner-content position-absolute">
                            <h4>MediHub</h4>
                            <h5>Favori des <br/>clients</h5>
                        </div>
                    </div>
                    <div className="samll-banner position-relative ">
                        <img src="images/photo4.png" alt="" className="img-fluid rounded-3" />
                        <div className="small-banner-content position-absolute">
                            <h4>MediHub</h4>
                            <h5>15% Off</h5>
                            <p></p>
                        </div>
                    </div>
                 </div>
                </div>
            </div>
         </div>  
        </section>
        <div className="Medical-wrapper home-wrapper-2 my-5">
  <div className="row align-items-center">
    <div className="col-md-8 slider-container">
      <LatestAcceptedProducts />
    </div>

    <div className="col-md-4 shorter-image-container position-relative">
      <img
        src="images/section1.png"
        alt="Image de présentation"
        className="img-fluid"
      />
      <div className="Medical-banner-content position-absolute">
        <h5>Équipez votre hôpital avec <br/> nos solutions médicales<br/> de pointe</h5>
        <h4>des équipements hospitaliers<br/> fiables, innovants<br/> et certifiés <br/>pour garantir des soins <br/>optimaux à vos patients."</h4>
        <p></p>
      </div>
    </div>
  </div>
</div>

        <section className="catégorie-section container  my-5">
                <div className="container-xxl">
                    <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Découvrez nos catégories</h3>
                    </div>
                        <div className="col-12">
                            <CategorySlider />
                        </div>
                    </div>
                </div>
        </section>
        <div className="mobilite-wrapper  home-wrapper-2  my-5">
  <div className="row align-items-center">
    <div className="col-md-8 slider-container">
    <LatestAcceptedProducts />

    </div>

    <div className="col-md-4 shorter-image-container position-relative">
      <img
        src="images/banner2.png"
        alt="Image de présentation"
        className="img-fluid"      
      />
            <div className="mobilite-banner-content position-absolute">
            <h5>Découvrez nos produits <br/> de mobilité </h5>
        <h4>Une gamme d'équipements <br/> de qualité incluant<br/> fauteuils roulants et <br/> déambulateurs  conçus <br/> pour améliorer la<br/> mobilité des personnes <br/> à mobilité réduite."</h4>
        
        <p></p>
      </div>
    </div>
  </div>
</div>        
<section className="famous-wrapper container my-4 ">
            <div className="container-xxl">
                <div className="row">
                <h2>Découvrez les nouveaux produits de la catégorie</h2>
                <p> soigneusement sélectionnés pour répondre à vos besoins</p>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/famous1.png" className="img-fluid" alt="" />
                            <div className="famous-content position-absolute">
                            <h5 className="text-dark"> </h5>
                            <h6 className="text-dark">Consommables médicaux </h6>
                            <p className="text-dark"></p>
                            </div>   
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card  position-relative">
                            <img src="images/famous3.png"className="img-fluid" alt="" />
                            <div className="famous-content position-absolute">
                            <h5 className="text-dark"></h5>
                            <h6 className="text-dark">Consommable Dentaire</h6>
                            <p className="text-dark"></p>
                            </div>   
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="famous-card position-relative ">
                            <img src="images/famous4.png" className="img-fluid" alt="" />
                            <div className="famous-content position-absolute">
                            <h5 className="text-dark"> </h5>
                            <h6 className="text-dark">Dispositifs médicaux </h6>
                            <p className="text-dark"></p>
                            </div>   
                        </div>
                    </div>
           
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img src="images/famous5.png" className="img-fluid" alt="" />
                            <div className="famous-content position-absolute">
                            <h5 className="text-dark"></h5>
                            <h6 className="text-dark">Équipements spécialisés </h6>
                            <p  className="text-dark"></p>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
        <div className="diabete-wrapper  home-wrapper-2  my-5">
  <div className="row align-items-center">
    <div className="col-md-8 slider-container ">
    <LatestAcceptedProducts />


    </div>

    <div className="col-md-4 shorter-image-container position-relative">
      <img
        src="images/banner.png"
        alt="Image de présentation"
        className="img-fluid"
      />
          <div className="diabete-banner-content position-absolute">
          <h5>Prévention du Diabète </h5>
        <h4>Une gamme de produits<br/>  pour la prévention du diabète<br/>  incluant des dispositifs de mesure <br/>de la glycémie <br/> et des aliments <br/> sains conçus <br/> pour soutenir<br/> la santé ."</h4>

        <p></p>
      </div>
    </div>

  </div>
</div>       

        </>
    );
    
};
export default Home 