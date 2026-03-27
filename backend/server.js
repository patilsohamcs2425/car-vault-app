const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const authRoutes = require('./routes/authRoute');
const carRoutes = require('./routes/carRoute');

const app = express();

// Render assigns a dynamic port, so we MUST use process.env.PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json()); 

// IMPORTANT: Disable buffering so the app fails fast if the DB is down
// instead of hanging for 10 seconds (fixes your 500 timeout error)
mongoose.set('bufferCommands', false);

// Database Connection using Environment Variable
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/car-vault';

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds if connection fails
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => {
    console.error("❌ MongoDB Connection Error Details:");
    console.error(err.message);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Car Vault Backend is Running!');
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));