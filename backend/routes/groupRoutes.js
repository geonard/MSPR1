const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); 

// Chemin vers le fichier JSON
const groupsFilePath = path.join(__dirname, '../data/groups.json');

// Route pour récupérer la liste des groupes
router.get('/', (req, res) => {
  fs.readFile(groupsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON:', err);
      return res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }

    // Analyse les données JSON et les renvoie dans la réponse
    res.json(JSON.parse(data));
  });
});

module.exports = router;
