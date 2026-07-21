const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running successfully' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

//usertoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWRhMzVhM2I3YWUyMjI0MTMwMWRkZCIsImlhdCI6MTc4NDUyMTU2MywiZXhwIjoxNzg1MTI2MzYzfQ.VzQ-E0W9Yeu2_XtV1dJ72hdzdqJQB36ukaihRs37xUw
// admintoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWRhMzI5NDNlZGZlODZlMzllN2NmNyIsImlhdCI6MTc4NDUyMTUxMywiZXhwIjoxNzg1MTI2MzEzfQ.VVlVUiSGasKHzusfE3RkpBEWVlvx8hB2dTRoodi48eM