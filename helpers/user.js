const User = require('../models/User');

async function getUserInfo(userId) {
    try {
        return await User.findById(userId);        
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
        return null;
    }
}

module.exports = { getUserInfo };