const Room = require('../models/Room');

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
exports.getRooms = async (req, res) => {
    try {
        // Filtering and pagination
        const { roomType, minPrice, maxPrice, capacity, isAvailable } = req.query;
        const filter = {};

        if (roomType) filter.roomType = roomType;
        if (isAvailable) filter.isAvailable = isAvailable === 'true';
        if (capacity) filter.capacity = { $gte: parseInt(capacity) };
        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = parseInt(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = parseInt(maxPrice);
        }

        const rooms = await Room.find(filter);
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
exports.updateRoom = async (req, res) => {
    try {
        let room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        await room.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get available rooms
// @route   GET /api/rooms/available
// @access  Public
exports.getAvailableRooms = async (req, res) => {
    try {
        const { checkIn, checkOut } = req.query;

        // If dates provided, check availability
        if (checkIn && checkOut) {
            const rooms = await Room.find({
                isAvailable: true,
                'bookedDates': {
                    $not: {
                        $elemMatch: {
                            $or: [
                                { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
                                { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } }
                            ]
                        }
                    }
                }
            });
            return res.status(200).json({
                success: true,
                count: rooms.length,
                data: rooms
            });
        }

        // If no dates, return all available rooms
        const rooms = await Room.find({ isAvailable: true });
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};