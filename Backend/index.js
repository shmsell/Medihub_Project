const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require('cors');
const dbconnect = require("./config/dbconnect");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRoute");
const supplierRouter = require("./routes/supplierRoute")
const categoryRouter = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const RequestRoutes = require('./routes/ProductRequestRoute');





// Connexion à la base de données
dbconnect();

// Middleware pour parser le corps des requêtes JSON
app.use(bodyParser.json({ limit: '10mb' }));  // Augmente la limite à 10MB pour les JSON
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: 'http://localhost:3000', // Autorise uniquement ce domaine
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],  // Autorise uniquement ces méthodes
  allowedHeaders: ['Content-Type', 'Authorization'],  // Autorise ces en-têtes
}));
app.use(express.json());

// Définir les routes API avant la route de test
app.use("/api/user", authRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/Request", RequestRoutes);








// Route de test
app.use("/", (req, res) => {
  res.json({ message: 'hello' });});

app.post('/api/auth/register', (req, res) => {
    console.log('Received request:', req.body);
    // Traiter la demande
});
// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
