const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");


// Declare the Schema of the Mongo model
const SupplierSchema = new mongoose.Schema({
    nomEntreprise: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    numeroTelephone: { type: String, required: true },
    adresse: { type: String, required: true },
    motDePasse: { type: String, required: true },
    statut: { type: String, enum: ['en_attente', 'accepté', 'rejeté'], default: 'en_attente' },
});
// Hachage du mot de passe avant la sauvegarde
SupplierSchema.pre('save', async function(next) {
    if (!this.isModified('motDePasse')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
        next();
    } catch (error) {
        next(error);
    }
});
// Méthode pour comparer le mot de passe
SupplierSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.motDePasse);
};
SupplierSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
  };
  
//Export the model
module.exports = mongoose.model('Supplier', SupplierSchema);