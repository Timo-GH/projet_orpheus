const profilUpdate = async (req, res, next) => {
    const { field, value } = req.body;
    const userId = req.session.user.id;

    if (!field || !value) {
        return res.status(400).json({ error: "Champ ou valeur manquant(e)." });
    }

    const allowedFields = ["userName", "password", "email", "youtube"];
    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: "Champ non autorisé." });
    }

    try {
        // Mise à jour dynamique
        const updateData = { [field]: value };
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.locals.updatedUser = user; // Stocke l'utilisateur mis à jour dans `res.locals`
        return next();
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return res.status(500).json({ error: "Erreur serveur." });
    }
};
