import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();


export const register = async (req, res) => {
    const {name, email, role, password, confirmPassword} = req.body;

    const existUser = await UserModel.findOne({email});
    if(existUser){     
        res.status(400).json({success: false, msg: 'User already registered', existUser});
    }   

    if(password !== confirmPassword){     
        res.status(400).json({success: false, msg: 'Password and Confirm password must be same'});
    }    

    // bcrypt the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedCpassword = await bcrypt.hash(confirmPassword, 10);    

    
    try {
        const registeredUser = await UserModel.create({name, email, role, password: hashedPassword, confirmPassword: hashedCpassword});
        res.status(201).json({success: true, msg: 'User registered successfully', data: registeredUser});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await UserModel.findOne({email});        
        if(!user){                        
            res.status(400).json({success: false, msg: 'Invalid email or password'});
        }    

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){                        
            res.status(400).json({success: false, msg: 'Invalid email or password'});
        }    

        const credentials = {userId: user._id, role: user.role}
        const token = await jwt.sign(credentials, process.env.SECRET_KEY , {expiresIn: '1d'})

        res.status(200).json({success: true, msg: 'User logged successfully', data: {token, user}});
    } catch (error) {
        res.status(500).json({success: false, msg: error.message})      
    }
}