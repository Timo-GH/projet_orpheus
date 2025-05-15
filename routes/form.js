const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireUser } = require('../middlewares/authMiddleware');

router.post("/profil", requireUser, async (req, res) => {
    console.log("Requête reçue :", req.body);
    const userId = req.session.user.id;

    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Re-rendre la page profil avec les données mises à jour
        res.render('layouts/default_layout', { 
            title: 'Profil Utilisateur',
            view: 'profil',
            user: user 
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du pseudo :', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;