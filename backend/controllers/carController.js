const Car = require("../models/carModel");
const jwt = require("jsonwebtoken");

// FIX: This must match your AuthController and Routes exactly!
const SECRET_KEY = process.env.JWT_SECRET || "jwtSecret";

exports.getAllCars = async (req, res) => {
    try {
        const { search, year, sort } = req.query;
        let query = {};
        
        if (search) {
            query.$or = [
                { company: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } }
            ];
        }

        if (year) {
            query.year = Number(year);
        }

        let sortOption = {};
        if (sort === 'priceAsc') sortOption.price = 1;
        if (sort === 'priceDesc') sortOption.price = -1;
        if (sort === 'yearDesc') sortOption.year = -1;
        if (sort === 'yearAsc') sortOption.year = 1;

        const cars = await Car.find(query).sort(sortOption);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        // Senior Dev Strategy: 
        // We now get the user ID from the 'verifyToken' middleware we added to the route.
        // If req.user exists, use it. If not, try the manual check as a backup.
        let userId = req.user ? req.user.id : null;

        if (!userId) {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, SECRET_KEY);
                userId = decoded.user.id;
            }
        }

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Please log in again" });
        }

        // Create the car and link it to the logged-in user
        const car = new Car({ ...req.body, owner: userId });
        await car.save();
        
        res.status(201).json({ success: true, car, message: "Car saved successfully!" });
    } catch (error) {
        console.error("Create Car Error:", error.message);
        res.status(500).json({ success: false, message: "Error saving car", debug: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, car });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Car Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting car" });
    }
};