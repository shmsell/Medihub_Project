import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactImageZoom from 'react-image-zoom';
import { FaBasketShopping ,FaStar ,FaRegStarHalfStroke} from "react-icons/fa6";
import { FaPlus , FaMinus } from "react-icons/fa";




const SingleProduct = () => {
  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartError, setCartError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du produit');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');  // Assurez-vous que l'utilisateur est connecté et que le token est disponible

      if (!token) {
        alert("Vous devez être connecté pour ajouter des produits au panier.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,  // ID du produit à ajouter
          quantity: quantity,      // Quantité de produit
        }),
      });

      if (!response.ok) {
        // Si la réponse n'est pas OK, afficher un message d'erreur
        const data = await response.json();
        throw new Error(data.message || 'Erreur lors de l\'ajout au panier');
      }

      const data = await response.json();
      alert('Produit ajouté au panier avec succès');
    } catch (error) {
      console.error('Erreur:', error.message);
      alert('Erreur lors de l\'ajout au panier : ' + error.message);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!product) {
    return <div>Produit non trouvé</div>;
  }
  const props = {
    width: 500,
    height: 550,
    zoomWidth: 500,
    img: product.coverPhoto ? `http://localhost:5000/uploads/${product.coverPhoto}` : ''
  };

  return (
    <>
        <section className="py-5">
  <div className="container">
    <div className="row gx-5">
      <aside className="col-lg-6">
        <div className="border rounded-4 mb-3 d-flex justify-content-center">
               <ReactImageZoom {...props} />,
        </div>
        <div className="d-flex justify-content-center mb-3">
          
        {product.gallery && product.gallery.length > 0 ? (
          product.gallery.map((photo, index) => (
            <div  className="border mx-1 rounded-2">
            <img
              key={index}
              src={`http://localhost:5000/uploads/${photo}`}
              alt={`Galerie photo ${index + 1}`}
              width="60"
              height="60"
              className="rounded-2"
            />
            
            </div>
        
          ))
        ) : (
          <p>Aucune photo dans la galerie.</p>  )}
        </div>
      </aside>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-dark">
          {product.nom || 'Nom non spécifié'}
          </h4>
          
          <div className="d-flex flex-row my-3">
            <div className="text-warning mb-1 me-2">
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaRegStarHalfStroke/>
              <i className="fas fa-star-half-alt"></i>
              <span className="ms-1">4.5</span>
            </div>
            <span className="text-muted">
              <FaBasketShopping className="fas fa-sm mx-1"/>154 Commandes
            </span>
            <span className="text-success ms-2">In stock</span>
          </div>
          <hr />

          <div className="mb-3">
            <span className="h5">{product.prix ? `${(product.prix * 1.6).toFixed(2)} Dh` : 'Prix non spécifié'}</span>
            <span className="text-muted"></span>
          </div>
          <p>
          {product.description || 'Description non spécifiée'}
          </p>
          <div className="row">
            <dt className="col-3">Catégorie:</dt>
            <dd className="col-9">{product.category ? product.category.nom : 'Non spécifiée'}</dd>

          </div>
          <hr />
          <div className="row mb-4">
            <div className="col-md-4 col-6 mb-3">
              <label className="mb-2 d-block">Quantity</label>
              <div className="input-group mb-3" style={{ width: '170px' }}>
                <button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon1"
                  data-mdb-ripple-color="dark"
                >
                  <FaMinus className="fas fa-minus"/>
                </button>
                <input
                  type="text"
                  className="form-control text-center border border-secondary"
                  placeholder="1"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon2"
                  data-mdb-ripple-color="dark"
                >
                  <FaPlus className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
          <a href="#" className="btn shadow-0 me-3 mb-2" style={{ backgroundColor: '#1cb3e4', color: '#fff' }}>
  Acheter Maintenant 
</a>
<button onClick={handleAddToCart} className="btn  shadow-0 me-3 mb-2"  style={{ backgroundColor: '#0c4b7a', color: '#fff' }}>
  <FaBasketShopping className="me-1" /> Ajouter au Panier
</button>

        </div>
      </main>
    </div>
  </div>

</section>
<hr/>
      {/* <section className='reviews-wrapper py-5 homme-wrapper-2'>
       <div className='container-xxl'>
         <div className='row'>
           <div className='col-12'>
            <div className='review-head d-flex justify-content-between align-items-end'>
              <div>
                <h4 className='mb-2'>reviews client</h4>
              </div>

            </div>

           </div>
          </div> 
       </div>
 
     </section> */}





    </>

  );
};

export default SingleProduct;
