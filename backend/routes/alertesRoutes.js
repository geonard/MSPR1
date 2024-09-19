// backend/routes/alertsRoutes.js
const express = require('express');
const router = express.Router();
const alertsData = require('../data/alerts.json'); // Chemin vers votre fichier JSON

// Route pour récupérer les alertes
router.get('/alerts', (req, res) => {
  res.json(alertsData);
});

module.exports = router;
