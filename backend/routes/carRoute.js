const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // 1. Add this
const carController = require('../controllers/carController');

// 2. ADD THIS SECURITY MIDDLEWARE RIGHT HERE
const SECRET_KEY = process.env.JWT_SECRET || "jwtSecret"; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

// 3. PROTECT THE ROUTES (Add 'verifyToken' to create, update, and delete)
router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);

router.post('/createCar', verifyToken, carController.createCar); // PROTECTED
router.put('/updateCar/:id', verifyToken, carController.updateCar); // PROTECTED
router.delete('/deleteCar/:id', verifyToken, carController.deleteCar); // PROTECTED

module.exports = router;