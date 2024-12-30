import React from "react";
import { Link } from "react-router-dom";
const SpecialProduct =() =>{
    return (
        <>
        <div className="col-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div>
                    <img src="public/images/Produit1.png" alt="" />

                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">Medihub</h5>
                        <h6 className="title"> produit 1</h6>
                        <p className="price"> 
                            <span className="red-p"> 100</span>
                            </p>
                            <div className="discount-till d-flex align-items-center gap-10">
                                <p className="mb-0">
                                    <b>5 </b>Jours
                                </p>
                                <div className="d-flex gap-10 align-items-center">
                                    <span className="badge rounded-circle p-3 bg-warning">1</span>:
                                    <span className="badge rounded-circle p-3 bg-warning">1</span>:
                                    <span className="badge rounded-circle p-3 bg-warning">1</span>

                                </div>
                            </div>
                            <div className="prod-count my-3">

                            </div>
                            <Link className="button" to="">Ajouter au panier</Link>

                    </div>
                </div>

            </div>
        </div>

        </>
    );
};
export default SpecialProduct