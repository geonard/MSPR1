const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Route pour récupérer authentification
router.get('/', (req, res) => {
    const authentificationPath = path.join(__dirname, '../data/authentification.json');
    fs.readFile(authentificationPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier FauthentificationQ:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la authentification' });
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


// Charger les utilisateurs depuis le fichier JSON
const loadUsers = (callback) => {
  fs.readFile(authentificationPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier d\'authentification:', err);
      return callback(err);
    }
    try {
      const users = JSON.parse(data);
      callback(null, users);
    } catch (parseError) {
      console.error('Erreur lors de la conversion en JSON:', parseError);
      callback(parseError);
    }
  });
};

// Endpoint pour récupérer tous les utilisateurs
router.get('/authentification', (req, res) => {
  loadUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
    res.json(users);
  });
});

// Endpoint pour inscrire un nouvel utilisateur
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  loadUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    // Vérifiez si l'utilisateur existe déjà
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Créer un nouvel utilisateur
    const newUser = { email, password };
    users.push(newUser);

    fs.writeFile(authentificationPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
      }
      res.status(201).json({ message: 'Inscription réussie' });
    });
  });
});

// Endpoint pour la connexion d'un utilisateur
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  loadUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    // Vérifier les informations d'identification
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    res.status(200).json({ message: 'Connexion réussie' });
  });
});

module.exports = router;
