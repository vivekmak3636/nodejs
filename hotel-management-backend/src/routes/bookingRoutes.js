const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getAllBookings,
    getBooking,
    updateBookingStatus,
    cancelBooking,
    updatePaymentStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (user)
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/cancel', protect, cancelBooking);

// Admin only routes
router.get('/', protect, authorize('admin'), getAllBookings);
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);
router.put('/:id/payment', protect, authorize('admin'), updatePaymentStatus);

module.exports = router;