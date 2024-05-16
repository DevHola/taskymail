const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    let token;
    
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // Check if the token is sent via headers
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    else if (req.headers['auth-access-token']) {
        token = req.headers['auth-access-token'];
    }
    
    if (!token) {
        return res.status(401).json({
            message: 'Missing Auth token'
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token'
            });
        } else {
            next(error);
        }
    }
};

module.exports = verify;
