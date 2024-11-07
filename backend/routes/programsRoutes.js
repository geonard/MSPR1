const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Route pour récupérer les programmes
router.get('/', (req, res) => {
  const programsPath = path.join(__dirname, '../data/programs.json');
  fs.readFile(programsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier des programmes:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des programmes' });
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
