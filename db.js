require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connexion à MongoDB réussie");
    } catch (error) {
        console.error('Erreur de connexion MongoDB', error);
        setTimeout(connectDB, 5000); //Retente une connexion après 5sec
        process.exit(1);        
    }
};

module.exports = connectDB;
