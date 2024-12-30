import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";



import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link

const ConfirmationOrder = () => {
    return (
        <div className="confirmation-order text-center">
            <h1>Merci pour votre commande !</h1>
            <FaCheckCircle className='icon' />
            <div className="thank-you-message">
                <p>Votre commande a été confirmée.</p>
                <p>Nous vous remercions de votre confiance !</p>
            </div>
            <Link to="/products" className="text-body">
                        <i className="fas fa-long-arrow-alt-left "></i>
                        <FaArrowLeftLong class=""/>  Retour au site
                      </Link>
        </div>
    );
};


export default ConfirmationOrder;
