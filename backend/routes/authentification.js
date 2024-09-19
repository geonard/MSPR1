const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assurez-vous que le chemin est correct
const router = express.Router();

// Clé secrète pour JWT (à stocker en sécurité dans les variables d'environnement)
const JWT_SECRET = 'f6gA#9kd@!5yT3Q$7uP&nB8*RzX0vL2C';

// Inscription
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier les identifiants de l'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Comparer les mots de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Générer un jeton JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
