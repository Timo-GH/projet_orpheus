const express = require("express");
const router = express.Router();

router.post("/test", (req, res) => {
    res.status(200).json({ success: true, message: "Route test => ok" });
});

module.exports = router;
