import React from "react";
import { Link } from "react-router-dom";
import { BsCreditCard2Back } from "react-icons/bs";
import SpecialProduct from "../../../frontend/src/Client/components/SpecialProduct";
import ProduitSection from "../../../frontend/src/Client/components/ProduitSection";
const Home =() =>{
    return (
        <>
        <section className="home-wrapper-1 py-5">
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
        <section className="home-wrapper-2 py-5">
            <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                 <div className="servies d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-10">
                        <img src="images/service-02.png" alt="" />
                        <div>
                            <h6> surprises quotidiennes</h6>
                            <p className="mb-0">Jusqu'à -25% : Profitez-en vite !</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                        <img src="images/service-03.png"alt="" />
                        <div>
                            <h6>Assistance 24h/24 et 7j/7</h6>
                            <p className="mb-0">Nous somme la pour vous </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                        <img src="images/service-04.png" alt="" />
                        <div>
                            <h6>Prix abordable</h6>
                            <p className="mb-0"> sourires garantis</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                        
                        <img src="images/service-05.png" alt="" />
                        <div>
                            <h6>Paiements sécurisés</h6>
                            <p className="mb-0">100% paiement sécurisé</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                        <img src="images/service.png" alt="" />
                        <div>
                            <h6>Livraison Rapide</h6>
                            <p className="mb-0">Partout au maroc</p>
                        </div>
                    </div>
                    </div> 
                </div>
            </div>
            </div>
         

        </section>
        <section className="home-wrapper-2 py-5">
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
                <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Appareil éléctronique et Diabète
                            </h6>
                      
                        </div>
                        <img src="images/categorie1.png" alt="Consommables Médicaux" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Hygiène et désinféction
                            </h6>
                       
                        </div>
                        <img src="images/categorie2.png" alt="Dispositifs Médicaux" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Mobilité et Maintien à domicile
                            </h6>
                        </div>
                        <img src="images/categorie3.png" alt="Mobilier Médical" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Consommable Dentaire 
                            </h6>
                        </div>
                        <img src="images/categorie4.png" alt="Équipements de Laboratoire" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Produits de Soin et Hygiène</h6>
                        </div>
                        <img src="images/categorie4.png" alt="Produits de Soin et Hygiène" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Respiratoire
                            </h6>
                        </div>
                        <img src="images/categorie4.png" alt="Accessoires Médicaux" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Orthopédie
                            </h6>
                        </div>
                        <img src="images/categorie4.png" alt="Équipements de Réanimation et Urgence" />
                    </div>
                    <div className="d-flex gap-30 align-items-center"> 
                        <div>
                            <h6>Produits de Gestion des Déchets Médicaux</h6>
                        </div>
                        <img src="images/categorie4.png" alt="Produits de Gestion des Déchets Médicaux" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section className="featured-wrapper-2 py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading"> Nouvelle arrivage</h3>
                    </div>
                    <ProduitSection />
                    <ProduitSection />
                    <ProduitSection />
                    <ProduitSection />    
                </div>
            </div>
</section>

         <section className="famous-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
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
                    <div className="col-3">
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
        <section className="Sepecial-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading"> Sélection spéciale  </h3>
                    </div>
                     <SpecialProduct />
                     <SpecialProduct />
                     <SpecialProduct />       
                </div>
            </div>
        </section>
        {/* <section className="featured-wrapper-2 py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading"> Nouvelle arrivage</h3>
                    </div> 
                </div>
                <div className="row">
                    <div className="col-2">
                        <div className="card"></div>
                    </div>
                    <div className="col-2">
                        <div className="card"></div>
                    </div>

                <ProduitSection />
                    <ProduitSection />
                    <ProduitSection />
                    <ProduitSection />   
                </div>
            </div>
</section> */}



        </>
    );
};
export default Home