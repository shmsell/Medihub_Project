const multer = require('multer');
const path = require('path');

// Définir l'emplacement de stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier
  }
});

// Filtrage des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

// Créer l'instance Multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
