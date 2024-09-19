const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour les utilisateurs
const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

// Créer le modèle à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
