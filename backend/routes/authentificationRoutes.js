// backend/routes/authentfication.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Route pour récupérer la FAQ
router.get('/', (req, res) => {
  const authentficationPath = path.join(__dirname, '../data/authentification.json');
  fs.readFile(authentficationPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier authentification:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération de authentfication' });
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Erreur lors de la conversion en JSON:', parseError);
      res.status(500).json({ error: 'Erreur lors de la conversion des données en JSON' });
    }
  });
});

module.exports = router;
