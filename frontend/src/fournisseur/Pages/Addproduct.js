import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery((prevGallery) => [...prevGallery, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter un produit.');
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('category', categorie);
    if (coverPhoto) formData.append('coverPhoto', coverPhoto);
    gallery.forEach((file) => formData.append('gallery', file));

    try {
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        alert('Votre session a expiré. Veuillez vous reconnecter.');
        navigate('/login');
        return;
      }

      const data = await response.json();
      if (data.error) {
        alert("Erreur lors de l'ajout du produit: " + data.error);
      } else {
        setSuccessMessage('Produit ajouté avec succès !');
        // Réinitialiser les champs après le succès
        setNom('');
        setDescription('');
        setPrix('');
        setCategorie('');
        setCoverPhoto(null);
        setGallery([]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
      alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/category/all');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Chargement des catégories...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="add-product-wrapper mt-5">
      {/* Bloc pour les informations du produit */}
      <div className="info-product-wrapper border rounded p-4 shadow-sm mb-4">
        <h3 className="">Informations du produit</h3>
        <hr/>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className='row'>
            <div className='col-6'>
              <div className="form-group">
                <label className="col-sm-12 col-form-label">Nom</label>
                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Entrez le nom du produit"
                    required
                  />
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-group">
                <label className="col-sm-12 col-form-label">Prix</label>
                <div className="col-sm-12">
                  <input
                    type="number"
                    className="form-control"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    placeholder=" Entrez le prix du produit"
                    required
                    
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-12 col-form-label">Description</label>
            <div className="col-sm-12">
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Entrez une description du produit"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-12 col-form-label">Catégorie</label>
            <div className="col-sm-12">
              <select
                className="form-control"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.nom}
                    </option>
                  ))
                ) : (
                  <option>Aucune catégorie disponible</option>
                )}
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* Bloc pour l'ajout d'images */}
      <div className="img-product-wrapper border rounded p-4 shadow-sm mb-4">
        <h3 className="">Ajouter des images</h3>
        <hr/>
        <div className="form-group row">
          <label className="col-sm-12 col-form-label">Image de couverture:</label>
          <div className="col-sm-12">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-12 col-form-label">Galerie d'images:</label>
          <div className="col-sm-12">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
            />
          </div>
          <div className="row mt-5">
          {gallery.length > 0 ? (
            Array.from(gallery).map((file, index) => (
              <div key={index} className="col-md-3 mb-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Aperçu ${index}`}
                  className="img-thumbnail"
                />
              </div>
            ))
          ) : (
            <p>Aucune image sélectionnée.</p>
          )}
        </div>
        </div>
      </div>
      <div className="form-group row">
          <div className="col-sm-12 text-center">
            <button type="submit" className="button" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faUpload} /> Ajouter le produit
            </button>
          </div>
          {successMessage && <p className="alert alert-success mt-3">{successMessage}</p>}
        </div>
    </div>
  );
};

export default AddProduct;
