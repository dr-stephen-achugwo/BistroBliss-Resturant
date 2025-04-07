const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authorizeAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    
    try {
        const decoded = jwt.verify(token, config.jwt.secret); // Verify token
        
        if(decoded.isAdmin === false){
            return res.status(403).json({ message: 'Forbidden: User is not admin' });
        }
        req.user = decoded; // Attach user data (including ID) to req object 
        next(); // Proceed to next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = {authorizeAdmin};