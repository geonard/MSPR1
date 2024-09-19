const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Route pour obtenir la liste des groupes
router.get('/groups', (req, res) => {
  const filePath = path.join(__dirname, '../data/groups.json'); // Chemin vers le fichier JSON des groupes
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier:', err);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    let groups = JSON.parse(data);

    // Reformater les données
    groups = groups.map(group => ({
      id: group.id,
      name: group.name.toUpperCase(), // Exemple de transformation
      memberCount: group.members
    }));

    res.json(groups); // Envoyer les données JSON modifiées au client
  });
});

module.exports = router;
