const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (base64) => {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'products',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Erreur lors du téléchargement de l\'image');
  }
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { uploadImage, cloudinaryDeleteImg };
