const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour les événements
const eventSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availableTickets: { 
        type: Number, 
        required: true 
    }
});

// Créer le modèle à partir du schéma
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
