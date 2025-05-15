const express = require('express');
const router = express.Router();
const { requireUser, requireAdmin, requireTempUser, alreadyConnect } = require('../middlewares/authMiddleware');

router.get('/', requireUser, (req, res) => {
    res.render('layouts/default_layout', { 
        title: 'Accueil',
        view: 'index',
        user: req.user });
});

router.get('/profil', requireUser, (req, res) => {
    res.render('layouts/default_layout', { 
        title: 'Profil Utilisateur',
        view: 'profil',
        user: req.user });
});

router.get('/admin', requireAdmin, (req, res) => {
    res.render('layouts/default_layout', { 
        title: 'Panneau d\'administration',
        view: 'admin',
        user: req.user });
});

router.get('/login', alreadyConnect, (req, res) => {
    res.render('login');
});

router.get('/temp', requireTempUser, (req, res) => {
    res.render('temp', {
        user: req.user });
});

router.get('/logout', (req, res) => {
    console.log('Tentative de déco');
    req.session.destroy((err) => {
        if (err) {
            console.log('Déco impossible');
            return res.status(500).send('Erreur lors de la déconnexion');
        } else {
            res.clearCookie('connect.sid'); // Assure la suppression du cookie de session
            res.redirect('/login'); 
            console.log('Déco réussi');
        }
    });
});

router.get('/forms_profil/username', requireUser, (req, res) => {
    res.render('forms_profil/username-form',
        { user: req.user }
    );
});

router.get('/forms_profil/password', requireUser, (req, res) => {
    res.render('forms_profil/password-form',
        { user: req.user }
    );
});

router.get('/forms_profil/email', requireUser, (req, res) => {
    res.render('forms_profil/email-form',
        { user: req.user }
    );
});

router.get('/forms_profil/youtube', requireUser, (req, res) => {
    res.render('forms_profil/youtube-form',
        { user: req.user }
    );
});

router.post("/update-username", requireUser, async (req, res) => {
    const { newUsername } = req.body;
    const userId = req.session.userId;
    console.log("Corps de la requête :", req.body);


    if (!newUsername || !userId) {
        return res.status(400).json({ error: "Données invalides." });
    }

    try {
        // Mettre à jour le pseudo dans la base de données
        await req.user.findByIdAndUpdate(userId, { userName: newUsername });

        res.json({ success: true, message: "Pseudo mis à jour avec succès." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du pseudo :", error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
});


// router.get('/testco', (req, res) => {
//     console.log('Tentative de co');
//     req.session.user = {
//         id: 'admin',
//         userName: 'admin',
//         admin: true
//     };
//     console.log(req.session);
//     return res.redirect ('/temp');
// });

// router.get('*', (req, res) => {
//     res.redirect ('/');
// });


module.exports = router;