const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config'); 


// Middleware
app.use(cors());
app.use(express.json());

const port = config.PORT; // Utiliser la variable globale

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/live-events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

// Importer les routes depuis le dossier routes
const authentificationRoutes = require('./routes/authentificationRoutes');
const billeterieRoutes = require('./routes/billeterieRoutes');
const pointsOfInterestRoutes = require('./routes/pointsOfInterest');
const groupRoutes = require('./routes/groupRoutes');
const faqRoutes = require('./routes/faqRoutes');
const programsRoutes = require('./routes/programsRoutes');
const newsRoutes = require('./routes/newsRoutes');
const securityRoutes = require('./routes/securityRoutes');
const partnersRoutes = require('./routes/partnersRoutes');
const socialMediaRoutes = require('./routes/socialMediaRoutes');

// Utiliser les routes
app.use('/authentification', authentificationRoutes);
app.use('/news', newsRoutes);
app.use('/security', securityRoutes);
app.use('/faq', faqRoutes);
app.use('/programs', programsRoutes);
app.use('/groups', groupRoutes);
app.use('/partners', partnersRoutes);
app.use('/socialMedia', socialMediaRoutes);
app.use('/billerie', billeterieRoutes);

app.use('/imagesGroup', express.static(path.join(__dirname, './data/imagesGroup')));


// Middleware pour les routes de points d'intérêt
app.use('/pointsOfInterest', (req, res, next) => {
  console.log('Requête reçue sur /pointsOfInterest');
  res.locals.message = 'Bienvenue sur la route des points d\'intérêt'; // Stocker un message dans res.locals
  next(); // Passer au prochain middleware ou route
}, pointsOfInterestRoutes);

// Route par défaut
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API du festival Live Events');
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
