const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('En-tête d\'authentification:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Accès refusé, token manquant ou invalide' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Utilisateur authentifié:', decoded); // Ajoutez ceci pour voir l'utilisateur décodé

        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide, accès refusé' });
    }
};

module.exports = authenticateToken;
