const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: [true, 'Please add check-in date']
    },
    checkOutDate: {
        type: Date,
        required: [true, 'Please add check-out date']
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: [true, 'Please add number of guests'],
        min: 1
    },
    specialRequests: {
        type: String,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Refunded'],
        default: 'Pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Calculate total price before saving
bookingSchema.pre("save", async function () {
    if (
        this.isModified("checkInDate") ||
        this.isModified("checkOutDate") ||
        this.isModified("room")
    ) {
        const room = await mongoose.model("Room").findById(this.room);

        if (room) {
            const days = Math.ceil(
                (this.checkOutDate - this.checkInDate) /
                (1000 * 60 * 60 * 24)
            );

            this.numberOfDays = days;
            this.totalPrice = days * room.pricePerNight;
        }
    }
});

module.exports = mongoose.model('Booking', bookingSchema);