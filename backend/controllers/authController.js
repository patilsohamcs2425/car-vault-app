const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// FIX: Prioritize the Render Environment Variable
const SECRET_KEY = process.env.JWT_SECRET || "jwtSecret"; 

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation for empty fields (Senior dev best practice)
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        // Create user instance
        user = new User({ username, email, password, role: 'user' });

        // Hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Save to MongoDB Atlas
        await user.save();

        // Sign token with the correct SECRET_KEY
        const token = jwt.sign(
            { user: { id: user.id, role: user.role } }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            success: true, 
            token, 
            message: "User registered successfully" 
        });

    } catch (error) {
        console.error("Registration Error:", error.message);
        // This helps you see the REAL error in the Vercel Network tab
        res.status(500).json({ 
            success: false, 
            message: "Server error during registration", 
            debug: error.message 
        });
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

        // Use the same consistent SECRET_KEY for login
        const token = jwt.sign(
            { user: { id: user.id, role: user.role } }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token: token,
            role: user.role,       
            username: user.username 
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server Error during login", 
            debug: error.message 
        });
    }
};