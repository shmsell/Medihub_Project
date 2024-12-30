import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProduitSection from "../../../frontend/src/Client/components/ProduitSection";
import Breadcrumb from "../../../frontend/src/Client/components/Breadcrumb";
const Productlist =() =>{
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
         </Helmet>
        <Breadcrumb title="Produit list"></Breadcrumb>

        <div className="store-wrapper home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Acheter par catégories</h3>
                            <div>
                                <ul className="ps-0">
                                    <li> Produits de Soin et Hygiène
                                    </li>
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
                                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                  <label htmlFor="floatingInput">Min</label>
                                  </div>
                                  <div className="form-floating mb-3">
                                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                  <label htmlFor="floatingInput">Max</label>
                                  </div> 
                                </div>                       
                            </div>
                        </div>
                        {/* <div className="filter-card mb-3">
                            <h3 className="filter-title"></h3>
                        </div> */}
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">produit aléatoire</h3>
                            <div>
                                <div className="random-product d-flex">
                                    <div className="w-50">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            produit aléatoire
                                        </h5>
                                        <b>300</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid">
                            <div className="d-flex align-items-center gap-10">
                                <p className="mb-0">sort by :</p>
                                <select
                                 name="sort-by" 
                                 id="SortBy"
                                 className="fact-filters__sort select__select" 
                                 >
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>

                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-"></div>
                        <div className="product-list pb-5">
                            <ProduitSection />

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
export default Productlist