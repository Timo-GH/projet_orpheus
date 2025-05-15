const { getUserInfo } = require('../helpers/user');

// Middleware pour vérifier les rôles
function checkRole(requiredRoles) {
    return async (req, res, next) => {
        try {
            if (!req.session.user || !req.session.user.id) {
                return res.redirect('/login');
            }

            const user = await getUserInfo(req.session.user.id);

            if (!requiredRoles.includes(user.role)) {
                if (user.role === 'temp') {
                    return res.redirect('/temp'); 
                }
                return res.redirect('/');
            }

            req.user = user; 
            next();
        } catch (error) {
            console.error('Erreur lors de la vérification des rôles :', error);
            res.status(500).send('Erreur interne');
        }
    };
}

// Création des middlewares spécifiques
const requireUser = checkRole(['user', 'admin']);
const requireAdmin = checkRole(['admin']);
const requireTempUser = checkRole(['temp']);

// Vérifie si compte déjà connecté
function alreadyConnect(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

module.exports = {
    requireUser,
    requireAdmin,
    requireTempUser,
    alreadyConnect
};