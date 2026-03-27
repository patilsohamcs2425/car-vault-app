const express = require('express');
const cors = require('cors');
app.use(cors({ origin: '*' }));
const mongoose = require('mongoose');

// Import Routes
// MAKE SURE these files exist in your folders!
const authRoutes = require('./routes/authRoute');
const carRoutes = require('./routes/carRoute');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows Angular (port 4200) to talk to Node (port 5000)
app.use(express.json()); // Parses incoming JSON data

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/car-vault')
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Root Route (Just to check if server is alive in browser)
app.get('/', (req, res) => {
    res.send('Car Vault Backend is Running!');
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));