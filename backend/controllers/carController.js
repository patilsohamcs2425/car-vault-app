const Car = require("../models/carModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "jwtSecret";

// Helper: Extract User ID from Token
const getUserId = (req) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // Remove 'Bearer '
        if (!token) return null;
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.user.id;
    } catch (err) {
        return null;
    }
};

exports.getAllCars = async (req, res) => {
    try {
        // Extract Query Parameters
        const { search, year, sort } = req.query;

        // 1. Build Search/Filter Query
        let query = {};
        
        if (search) {
            // Search in Company OR Model (Case Insensitive)
            query.$or = [
                { company: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } }
            ];
        }

        if (year) {
            query.year = Number(year);
        }

        // 2. Build Sort Option
        let sortOption = {};
        if (sort === 'priceAsc') sortOption.price = 1;      // Low to High
        if (sort === 'priceDesc') sortOption.price = -1;    // High to Low
        if (sort === 'yearDesc') sortOption.year = -1;      // Newest First
        if (sort === 'yearAsc') sortOption.year = 1;        // Oldest First

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
        const userId = getUserId(req);
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const car = new Car({ ...req.body, owner: userId });
        await car.save();
        res.status(201).json({ success: true, car });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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