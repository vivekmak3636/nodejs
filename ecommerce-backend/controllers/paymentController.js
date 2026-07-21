const Payment = require('../models/Payment');
const Order = require('../models/Order');
// Fix: Initialize Stripe with proper error handling
let stripe;
try {
    const stripeModule = require('stripe');
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('⚠️ STRIPE_SECRET_KEY is not set. Stripe features will be disabled.');
        stripe = null;
    } else {
        stripe = stripeModule(process.env.STRIPE_SECRET_KEY);
    }
} catch (error) {
    console.error('Error initializing Stripe:', error.message);
    stripe = null;
}

// @desc    Create payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
    try {
        // Check if Stripe is initialized
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Payment service is currently unavailable. Please configure Stripe API key.'
            });
        }

        const { orderId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns the order
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalPrice * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                orderId: order._id.toString(),
                userId: req.user.id
            }
        });

        // Create payment record
        const payment = await Payment.create({
            user: req.user.id,
            order: orderId,
            amount: order.totalPrice,
            currency: 'usd',
            paymentMethod: 'card',
            stripePaymentIntentId: paymentIntent.id,
            paymentStatus: 'pending'
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentId: payment._id
        });
    } catch (error) {
        console.error('Payment intent error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
exports.confirmPayment = async (req, res) => {
    try {
        // Check if Stripe is initialized
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Payment service is currently unavailable. Please configure Stripe API key.'
            });
        }

        const { paymentIntentId } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Find payment
            const payment = await Payment.findOne({
                stripePaymentIntentId: paymentIntentId
            });

            if (payment) {
                payment.paymentStatus = 'completed';
                payment.paymentDetails = paymentIntent;
                await payment.save();

                // Update order
                const order = await Order.findById(payment.order);
                if (order) {
                    order.isPaid = true;
                    order.paidAt = Date.now();
                    order.paymentResult = {
                        id: paymentIntent.id,
                        status: paymentIntent.status,
                        update_time: new Date().toISOString(),
                        email_address: paymentIntent.receipt_email
                    };
                    await order.save();
                }
            }

            res.status(200).json({
                success: true,
                message: 'Payment confirmed successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment not successful'
            });
        }
    } catch (error) {
        console.error('Confirm payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get payment status
// @route   GET /api/payments/:id/status
// @access  Private
exports.getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('order', 'totalPrice orderItems')
            .populate('user', 'name email');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        // Check authorization
        if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        res.status(200).json({
            success: true,
            payment
        });
    } catch (error) {
        console.error('Get payment status error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all payments (Admin)
// @route   GET /api/payments
// @access  Private/Admin
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('user', 'name email')
            .populate('order', 'totalPrice orderItems')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: payments.length,
            payments
        });
    } catch (error) {
        console.error('Get all payments error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};