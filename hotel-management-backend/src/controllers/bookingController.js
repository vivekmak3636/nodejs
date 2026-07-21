const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const { roomId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = req.body;

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if room is available
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            room: roomId,
            status: { $in: ['Pending', 'Confirmed'] },
            $or: [
                { checkInDate: { $lt: checkOut, $gte: checkIn } },
                { checkOutDate: { $gt: checkIn, $lte: checkOut } }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({
                success: false,
                message: 'Room is already booked for the selected dates'
            });
        }

        // Calculate days and total price
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = days * room.pricePerNight;

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            room: roomId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfDays: days,
            totalPrice,
            numberOfGuests,
            specialRequests,
            status: 'Pending',
            paymentStatus: 'Pending'
        });

        // Add booked dates to room
        room.bookedDates.push({ checkIn, checkOut });
        room.isBooked = true;
        await room.save();

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('room', 'roomNumber roomType pricePerNight')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('room', 'roomNumber roomType')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('room', 'roomNumber roomType pricePerNight');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user owns the booking or is admin
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user owns the booking
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        // Check if booking can be cancelled
        if (booking.status === 'Completed' || booking.status === 'Cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking cannot be cancelled'
            });
        }

        booking.status = 'Cancelled';
        await booking.save();

        // Remove booked dates from room
        const room = await Room.findById(booking.room);
        if (room) {
            room.bookedDates = room.bookedDates.filter(
                date => date.checkIn.getTime() !== booking.checkInDate.getTime() &&
                    date.checkOut.getTime() !== booking.checkOutDate.getTime()
            );
            if (room.bookedDates.length === 0) {
                room.isBooked = false;
            }
            await room.save();
        }

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update payment status (Admin)
// @route   PUT /api/bookings/:id/payment
// @access  Private/Admin
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.paymentStatus = paymentStatus;
        await booking.save();

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};