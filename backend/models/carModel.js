const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    carNumber: { type: String, required: true },
    image: { type: String, required: true },
    // Insurance & History are optional nested objects if you add them later
    insuranceDetails: {
        policyNumber: String,
        provider: String,
        expirationDate: Date
    },
    serviceHistory: [{
        serviceDate: Date,
        serviceType: String,
        cost: Number,
        provider: String
    }]
});

module.exports = mongoose.model('Car', carSchema);