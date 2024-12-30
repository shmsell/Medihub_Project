const { uploadImage } = require('./utils/cloudinary');

(async () => {
  try {
    // Remplacez 'your_base64_image_string' par une vraie chaîne base64 pour tester
    const result = await uploadImage('your_base64_image_string');
    console.log('URL de l\'image uploadée:', result);
  } catch (error) {
    console.error('Erreur lors du test de l\'upload:', error);
  }
})();