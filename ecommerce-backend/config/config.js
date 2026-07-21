module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    clientURL: process.env.CLIENT_URL,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};