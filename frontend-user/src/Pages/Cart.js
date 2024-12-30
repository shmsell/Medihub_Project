import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";


const Cart =() =>{
    return (
        <>
        <section className="cart-wrapper py-5 homme-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center"> 
                        <h4  className="cart-col-1">Produit</h4>
                            <h4  className="cart-col-2">Prix</h4>
                            <h4  className="cart-col-3">Quantité</h4>
                            <h4  className="cart-col-4">Totale</h4>   
                        </div>
                        <div className="cart-data py-3  mb-2 d-flex justify-content-center align-items-center">   
                          <div  className="cart-col-1 gap-15 d-flex align-items-center">
                            <div className="w-75">
                                <img src="images/produit1.png"  className="img-fluid" alt="" />
                            </div>
                            <div className="w-75">
                            <p> iphone</p>
                            <p> rouge</p>
                            <p> XL</p>
                            </div>
     
                          </div>
                          <div  className="cart-col-2">
                            <h5 className="price"> 100dh</h5>
                          </div>
                          <div  className="cart-col-3 d-flex align-items-center gap-15">
                            <div>
                                <input type="number" className="form-control"
                                min={1}
                                max={10} />
                            </div>
                            <div>
                            <MdDelete  className="text-danger"/>
                            </div>
                          </div>
                          <div  className="cart-col-4"></div>

                        </div>
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className=" d-flex justifu content-beteween align-items-baseline"></div>
                        <Link to="" className="button">
                         continue to shopping
                         </Link>
                         <div className="d-flex flex-column align-items-end">
                            <h4>Totale</h4>
                            <p>taxes ans shipping et checkout</p>
                            <Link to="/checkout" className="button">
                            Checkout
                            </Link>
                         </div>
                    </div>
                </div>
            </div>      
        </section>
      
        </>
    );
};
export default Cart