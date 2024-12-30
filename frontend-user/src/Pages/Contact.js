import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";

const Contact =() =>{
    return (
        <>
        <div className="col-12 mt-5">
        <div className="contact-inner-wrapper home-wrapper-2 d-flex justifu-content-betweeen py-5 ">
            <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" className="d-flex flex-column gap-15">
                    <div>
                        <input type="text" className="form-control" placeholder="Prénom" />
                    </div>
                    <div>
                        <input type="text" className="form-control" placeholder="Email"/>
                    </div>
                    <div>
                        <input type="text" className="form-control" placeholder="Numéro telephone"/>
                    </div>
                    <div>
                         <textarea name="" id="" cols={30} rows={4} className="w-100 form-control" placeholder="Message"></textarea>
                    </div>
                    <div>
                        <button className="button border-0"> Submit </button>
                    </div>
                </form>
            </div>
            <div>
                <h3 className="contact-title mb-4">Get in </h3>
                <div>
                    <ul className="ps-0">
                        <li  className="mb-3 d-flex gap-15 align-items-center"> 
                        <IoHomeOutline className="fs-5" />
                        <address className="mb-0">hay si lkhdarr B50 nr 1</address>
                        </li>
                        <li className="mb-3  d-flex gap-15 align-items-center">
                         <FiPhoneCall  className="fs-5"/>
                         <a href="">0690745546</a>
                        </li>
                        <li className="mb-3  d-flex gap-15 align-items-center">
                         <IoMailOutline className="fs-5" />
                         <a>Msellekchaimae@gmail.com</a>
                        </li>
                        <li className="mb-3  d-flex gap-15 align-items-center">
                         <IoInformationCircleOutline  className="fs-5"/>
                         <p className="mb-0">Monday-friday 10 AM-8 PM</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
            
            </div>

        </div>
  
        </>
    );
};
export default Contact