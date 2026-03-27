const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "jwtSecret"; // In production, use process.env.JWT_SECRET

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Default role is 'user'. Admin role must be set manually in DB for now.
        user.role = 'user'; 
        
        await user.save();

        const token = jwt.sign({ user: { id: user.id, role: user.role } }, SECRET_KEY, { expiresIn: 3600 });
        res.status(201).json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ user: { id: user.id, role: user.role } }, SECRET_KEY, { expiresIn: 3600 });
        
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token: token,
            role: user.role,       // Send role to frontend
            username: user.username // Send username to frontend
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error during login" });
    }
};