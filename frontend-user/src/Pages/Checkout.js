import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";


const Checkout =() =>{
    return (
        <>
        <div className="Checkout -wrapper py-5 homme-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3>MediHub</h3>
                            <nav style={{"--bs-breadcrumb-divider": ">"}} aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
                            </nav>
                            <h4 className="title">
                                contact info
                            </h4>
                            <div className="user-details">
                                <p></p>
                                <form
                                action=""
                                className="d-flex gap-15  flex-wrap justify-content-between">
                                    <div className="w-100">
                                        <select
                                        className="form-control form-select"></select>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="w-100">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="w-100">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="flex-grow-1">
                                        <select
                                        className="form-control form-select"></select>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/Cart"> <IoMdArrowBack /> Return to cart </Link>
                                        <Link className="button"> continue to shipping</Link>

                                    </div>                               
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            <div></div>
                            <div><h5></h5></div>

                        </div>
                    </div>
                </div>
            </div>      
        </div>
        <div className="description-wrapper py-5 homme-wrapper-2">
         <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="bg-white p-3">
                            <h4>description</h4>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
        <section className="reviews-wrapper py-5 homme-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="review-head d-flex jusitify-content-between align-items-end"></div>
                    </div>
                    <h4> custmer reviews</h4>
                    <div className="d-flex gap-10">

                    </div>
                    <div>
                        <a href="">write a review</a>
                    </div>
                </div>
            </div>

        </section>
        <section className=""></section>
        </>
    );
};
export default Checkout 