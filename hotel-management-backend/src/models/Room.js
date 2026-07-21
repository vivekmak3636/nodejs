const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, 'Please add a room number'],
        unique: true
    },
    roomType: {
        type: String,
        required: [true, 'Please add a room type'],
        enum: ['Standard', 'Deluxe', 'Suite', 'Penthouse']
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Please add price per night'],
        min: 0
    },
    capacity: {
        type: Number,
        required: [true, 'Please add room capacity'],
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: 500
    },
    amenities: [{
        type: String,
        enum: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Pool Access', 'Gym Access', 'Parking']
    }],
    images: [{
        type: String
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    floor: {
        type: Number,
        required: [true, 'Please add floor number']
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedDates: [{
        checkIn: Date,
        checkOut: Date
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);