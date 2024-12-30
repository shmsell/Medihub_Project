import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoReceiptSharp ,IoWalletSharp} from "react-icons/io5";
import { FaMoneyBillWave ,FaArrowLeftLong } from "react-icons/fa6";



const Checkout = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    street: '',
    city: '',
    postalCode: '',
    paymentMethod: 'espèces',
  });
  const [success, setSuccess] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total');
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('Vous devez être connecté pour voir votre panier.');
        setLoading(false);
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/cart/getCart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.error("Erreur lors de la récupération du panier:", data);
        throw new Error(data.message || 'Erreur lors de la récupération du panier');
      }
  
      const cartData = await response.json();
      console.log("Données du panier:", cartData);
      setCartId(cartData._id);
      
      const validItems = cartData.items.map(item => ({
        ...item,
        product: item.productId,
      }));
      setCartItems(validItems);
      
      setLoading(false);
    } catch (error) {
      console.error("Erreur attrapée:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          ...formData, 
          cart: cartId, 
          totalAmount,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          mobile: formData.mobile,
          paymentMethod: formData.paymentMethod,
        }), 
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        navigate('/ConfirmationOrder');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erreur lors de la validation de la commande');
      console.error("Erreur attrapée:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
<div class="container">

<div class="row">
    <div class="col-xl-8">
    <form onSubmit={handleSubmit}>

        <div class="checkout">
            <div class="checkout-body">
                <ol class="activity-checkout mb-0 px-4 mt-3">
                    <li class="checkout-item">
                        <div class="avatar checkout-icon p-1">
                            <div class="avatar-title rounded-circle bg-primary">
                                <IoReceiptSharp 
                                class="text-white font-size-20"/>
                            </div>
                        </div>
                        <div class="feed-item-list">
                            <div>
                                <h5 class="font-size-16 mb-1">Informations de facturation</h5>
                                <p class="text-muted text-truncate mb-4">Veuillez renseigner vos informations de facturation pour finaliser votre commande.</p>
                                <div class="mb-3">
                                    <div>
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label class="form-label" for="billing-name">Nom</label>
                                                    <input type="text" class="form-control" id="billing-name" placeholder="Entrez le nom" name="firstname" value={formData.firstname} onChange={handleChange} required/>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label class="form-label" for="billing-name">Prénom</label>
                                                    <input type="text" class="form-control" id="billing-name" placeholder="Entrez le prénom" name="lastname" value={formData.lastname} onChange={handleChange} required/>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label class="form-label" for="billing-email-address">Adresse e-mail</label>
                                                    <input type="email" class="form-control" id="billing-email-address" placeholder="Entrez l'e-mail" name="email" value={formData.email} onChange={handleChange} required/>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label class="form-label" for="billing-phone">Téléphone</label>
                                                    <input type="text" class="form-control" id="billing-phone" placeholder="Entrez le numéro de téléphone" name="mobile" value={formData.mobile} onChange={handleChange} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="billing-address">Adresse</label>
                                            <textarea class="form-control" id="billing-address" rows="3" placeholder="Entrez l'adresse complète" name="street" value={formData.street} onChange={handleChange} required></textarea>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="mb-4 mb-lg-0">
                                                    <label class="form-label" for="billing-city">Ville</label>
                                                    <input type="text" class="form-control" id="billing-city" placeholder="Entrez la ville" name="city" value={formData.city} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="mb-0">
                                                    <label class="form-label" for="zip-code">Code postal</label>
                                                    <input type="text" class="form-control" id="zip-code" placeholder="Entrez le code postal" name="postalCode" value={formData.postalCode} onChange={handleChange} required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                        </li>
                        <li class="checkout-item">
                            <div class="avatar checkout-icon p-1">
                                <div class="avatar-title rounded-circle bg-primary">
                                    <IoWalletSharp class=" text-white font-size-20"/>
                                </div>
                            </div>
                            <div class="feed-item-list">
                                <div>
                                    <h5 class="font-size-16 mb-1">Informations de paiement</h5>
                                    <p class="text-muted text-truncate mb-4">Duis arcu tortor, suscipit eget</p>
                                </div>
                                <div>
                                    <h5 class="font-size-14 mb-3">Méthode de paiement :</h5>
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-6">
                                            <div>
                                            <label className="card-radio-label d-flex align-items-center justify-content-center">
    <input 
        type="radio" 
        name="pay-method" 
        id="pay-methodoption3" 
        className="card-radio-input" 
        defaultChecked 
    />

    <span className="card-radio py-3 text-center d-flex flex-column align-items-center">
        <FaMoneyBillWave className="mb-3 h2" />
        <span>Paiement à <br/>la livraison</span>
    </span>
</label>

                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                        
                    </ol>
                </div>
            </div>
            <div class="row my-4">
                <div class="col">
                    <a href="ecommerce-products.html" class="btn btn-link text-muted">
                        <FaArrowLeftLong class=" me-1"/> Continuer vos achats </a>
                </div> 
                <div class="col">
                    <button type="submit"  className='button'>Valider la Commande</button>
                </div> 
            </div>

            </form>             
        </div>
        
        <div className="col-xl-4">
            <div className="card checkout-order-summary">
                <div className="card-body">
                    <div className="p-3 bg-light mb-3">
                        <h5 className="font-size-16 mb-0">
                            Récapitulatif de la commande 
                        </h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-centered mb-0 table-nowrap">
                            <thead>
                                <tr>
                                    <th className="border-top-0" style={{ width: '110px' }} scope="col">
                                        Produit
                                    </th>
                                    <th className="border-top-0" scope="col">
                                        Nom du produit
                                    </th>
                                    <th className="border-top-0" scope="col">
                                        Prix
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <tr key={item.product._id}>
                                            <th scope="row">
                                                <img
                                                    src={`http://localhost:5000/uploads/${item.product.coverPhoto}`} 
                                                    alt="image-produit"
                                                    title="image-produit"
                                                    className="avatar-lg rounded"
                                                />
                                            </th>
                                            <td>
                                                <h5 className="font-size-16 text-truncate">
                                                    <a href="#" className="text-dark">
                                                        {item.product.nom}
                                                    </a>
                                                </h5>
                                                <p className="text-muted mb-0 mt-1">{(item.productId.prix * 1.6 ).toFixed(2)} dh</p>
                                            </td>
                                            <td>{(item.productId.prix * 1.6 * item.quantity).toFixed(2)} dh</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Aucun produit dans le panier.</td>
                                    </tr>
                                )}
                                <tr className="bg-light">
                                    <td colSpan="2">
                                        <h5 className="font-size-14 m-0">Total : {totalAmount} dh</h5>
                                    </td>
                                    <td>Total : {totalAmount} dh</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  );
};

export default Checkout;
