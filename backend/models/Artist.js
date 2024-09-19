const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour les artistes
const artistSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String 
    },
    bio: { 
        type: String 
    },
    imageUrl: { 
        type: String 
    }
});

// Créer le modèle à partir du schéma
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
