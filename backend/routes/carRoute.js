const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// These URLs must perfectly match what is in Angular's car.service.ts
router.get('/getAllCars', carController.getAllCars);
router.get('/getCarById/:id', carController.getCarById);
router.post('/createCar', carController.createCar);
router.put('/updateCar/:id', carController.updateCar);
router.delete('/deleteCar/:id', carController.deleteCar);

module.exports = router;