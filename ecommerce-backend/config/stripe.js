const stripe = require('stripe');

let stripeInstance = null;

try {
    if (process.env.STRIPE_SECRET_KEY) {
        stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
        console.log('✅ Stripe initialized successfully');
    } else {
        console.warn('⚠️ STRIPE_SECRET_KEY not set. Stripe features disabled.');
    }
} catch (error) {
    console.error('❌ Stripe initialization failed:', error.message);
}

module.exports = stripeInstance;