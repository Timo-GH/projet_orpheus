const express = require('express');
const router = express.Router();
const { verifyPassword } = require('../helpers/password');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    console.log("Requête POST reçue")

    const { userName, password } = req.body;

    console.log(req.body);

    try {
        console.log("Tentative de connexion pour : ", userName);
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(400).send(`L'utilisateur n'existe pas`);
        };
        const validPassword = await verifyPassword(user.password, password);
        if (validPassword) {
            req.session.user = {
                id: user._id
            };
            console.log(req.session);
            return res.redirect('/');
        } else {
            return res.status(400).send('Mot de passe incorrect');
        }
        
    } catch (error) {
        res.status(500).send('Erreur lors de la connexion');
    };
});

module.exports = router;