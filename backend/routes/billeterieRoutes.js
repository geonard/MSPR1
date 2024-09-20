const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Assurez-vous que le chemin est correct

// Récupérer tous les événements
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter un nouvel événement
router.post('/', async (req, res) => {
    const { name, date, location, price, availableTickets } = req.body;

    const event = new Event({
        name,
        date,
        location,
        price,
        availableTickets
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer un événement spécifique
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre à jour un événement
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            event.name = req.body.name || event.name;
            event.date = req.body.date || event.date;
            event.location = req.body.location || event.location;
            event.price = req.body.price || event.price;
            event.availableTickets = req.body.availableTickets || event.availableTickets;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un événement
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.remove();
            res.json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
