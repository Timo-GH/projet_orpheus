const mongoose = require('mongoose');
const { validate } = require('./User');

const historiqueSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Va chercher le ObjectID de la collecion USER
        ref: 'User', // Nom du modèle correspondant
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    lien: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/.test(v); // Vérifie si le lien est valide
            },
            message: props => `${props.value} n'est pas une URL valide !`
        }
    }
});

module.exports = mongoose.model('Historique', historiqueSchema);