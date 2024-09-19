// backend/models.js
const mongoose = require('mongoose');

// Modèle pour les événements
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
    location: String,
    tickets: [
        {
            type: String,
            price: Number,
            available: Number,
        },
    ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
