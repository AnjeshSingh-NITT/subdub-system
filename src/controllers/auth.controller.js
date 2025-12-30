import mongoose from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
    // Implementation for user sign-up
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name, email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('Email already in use / User exists');
            error.statusCode = 409 ;
            throw error;
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(String(password), 10);

        // Create new user
        const newUsers = await User.create([{name,email,password:hashedPassword}], {session});

        const token = jwt.sign(
            {userId: newUsers[0]._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRY}
        );
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: newUsers[0],
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const login = async (req, res, next) => {
    // Implementation for user login
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(String(password), user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {userId: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRY}
        );

        res
        .status(200)
        .json({success: true, message: 'Login successful', data: {token, user,}});
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    // Implementation for user logout
    try {
        // For JWT, logout can be handled on client side by deleting the token.
        res.status(200).json({success: true, message: 'Logout successful'});
    } catch (error) {
        next(error);
    }
}