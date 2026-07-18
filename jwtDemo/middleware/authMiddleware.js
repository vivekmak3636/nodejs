const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({
                success: false,
                message: "No token provided"
            });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.SECREET_KEY
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;