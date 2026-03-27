const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken'); // Added for the 'me' route

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// PRO TIP: Add a "Check Auth" route
// This helps your Angular app stay logged in after a page refresh.
const SECRET_KEY = process.env.JWT_SECRET || "jwtSecret";

router.get('/me', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ success: true, user: decoded.user });
    } catch (err) {
        res.status(401).json({ success: false, message: "Session expired" });
    }
});

module.exports = router;