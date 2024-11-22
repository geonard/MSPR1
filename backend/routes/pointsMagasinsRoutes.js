// routes/pointsOfInterest.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route pour obtenir tous les points d'intérêt depuis le fichier JSON
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/waypoints.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Données JSON lues:', jsonData); // Pour vérifier les données lues
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Erreur lors de l\'analyse du fichier JSON:', parseErr);
      res.status(500).json({ message: 'Erreur lors de l\'analyse du fichier JSON' });
    }
  });
});

module.exports = router;
