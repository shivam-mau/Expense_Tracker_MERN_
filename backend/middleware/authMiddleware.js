const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "Not authorised, no token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        //console.error("JWT Error:", err.message);  // 👈 asli reason yahan aayega
        //res.status(401).json({message: err.message});
        res.status(401).json({message: "Not authorizes, token failed"});

        
    }
}