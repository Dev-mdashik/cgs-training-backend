import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({success: false, msg: 'No token provided'});
    }

    try {
        const authorized = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = authorized;
        next();
    } catch (error) {
        res.status(401).json({success: false, msg: 'Invalid token'});
    }
}

export const authorize = async (req, res, next) => {
    const user = req.user;    
    try {
        if (user.role !== 'admin') {
            return res.status(403).json({success: false, msg: 'Access denied'});
        }       
        next();
    } catch (error) {
        return res.status(401).json({success: false, msg: error.message});
        
    }
}