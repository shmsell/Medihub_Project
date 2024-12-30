const User = require("../models/Usermodel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jawtoken");
const { generateRefreshToken } = require("../config/refreshtoken");
const bcrypt = require("bcrypt");

// Create a User ----------------------------------------------
const createUser = asyncHandler(async (req, res) => {
    /**
     * TODO:Get the email from req.body
     */
    const email = req.body.email;
    /**
     * TODO:With the help of email find the user exists or not
     */
    const findUser = await User.findOne({ email: email });
  
    if (!findUser) {
      /**
       * TODO:if user not found user create a new user
       */
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      /**
       * TODO:if user found then thow an error: User already exists
       */
      throw new Error("User Already Exists");
    }
  });
  const loginUserCtrl = asyncHandler(async (req, res) => {
    try {
      console.log("Login function called");
  
      const { email, password } = req.body;
  
      const findUser = await User.findOne({ email });
  
      if (findUser) {
        if (await findUser.isPasswordMatched(password)) {
          console.log(`User ID: ${findUser._id}`);
  
          const refreshToken = await generateRefreshToken(findUser._id);
  
          await User.findByIdAndUpdate(findUser._id, { refreshToken }, { new: true });
  
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          });
  
          res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser._id),
          });
        } else {
          res.status(401).json({ message: "Identifiants invalides." });
        }
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé." });
      }
    } catch (error) {
      console.error(error); // Affiche l'erreur dans la console
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });
  const getCurrentUser = async (req, res) => {
    try {
      const userId = req.user.id; // Assurez-vous que l'ID de l'utilisateur est dans req.user
      const user = await User.findById(userId).select('-password'); // Exclure le mot de passe
      
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      res.status(200).json(user); // Retourner les informations de l'utilisateur
  } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error); // Journaliser l'erreur
      res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // ID de l'utilisateur à partir du token
    const { firstname, lastname, email, mobile, currentPassword, newPassword } = req.body;

    // Trouver l'utilisateur par ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour les autres informations (sans toucher au mot de passe)
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    // Si l'utilisateur souhaite changer son mot de passe
    if (newPassword) {
      // Vérifier si l'ancien mot de passe est fourni
      if (!currentPassword) {
        return res.status(400).json({ message: 'Vous devez fournir votre mot de passe actuel pour en définir un nouveau.' });
      }

      // Vérifier si le mot de passe actuel est correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe actuel incorrect.' });
      }

      // Si correct, hacher le nouveau mot de passe et le sauvegarder
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Sauvegarder les modifications
    await user.save();

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des informations utilisateur.' });
  }
};
  
  
  
  module.exports = {
    createUser, 
    loginUserCtrl,
    getCurrentUser,
    updateUser

  };