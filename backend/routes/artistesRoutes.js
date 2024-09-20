const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist'); // Assurez-vous que le chemin est correct

// Récupérer tous les artistes
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter un nouvel artiste
router.post('/', async (req, res) => {
    const { name, genre, bio, imageUrl } = req.body;

    const artist = new Artist({
        name,
        genre,
        bio,
        imageUrl
    });

    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer un artiste spécifique
router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre à jour un artiste
router.put('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (artist) {
            artist.name = req.body.name || artist.name;
            artist.genre = req.body.genre || artist.genre;
            artist.bio = req.body.bio || artist.bio;
            artist.imageUrl = req.body.imageUrl || artist.imageUrl;

            const updatedArtist = await artist.save();
            res.json(updatedArtist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un artiste
router.delete('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (artist) {
            await artist.remove();
            res.json({ message: 'Artist deleted' });
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
