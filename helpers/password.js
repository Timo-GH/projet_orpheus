const argon2 = require('argon2');

// Hacher un mot de passe
async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        console.log('Mot de passe haché :', hash);
        return hash;
    } catch (err) {
        console.error('Erreur lors du hachage :', err);
    }
};

// Vérifier un mot de passe
async function verifyPassword(hash, password) {
    try {
        console.log('Vérification du mot de passe', hash);
        const validPassword = await argon2.verify(hash, password);
        console.log('Mot de passe valide :', validPassword);
        return validPassword;
    } catch (err) {
        console.error('Erreur lors de la vérification :', err.message);
        return false;
    }
};

module.exports = { hashPassword, verifyPassword };