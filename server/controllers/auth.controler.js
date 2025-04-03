import mongoose from "mongoose";
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
}


export const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }


    if (password.length < 8) {
        return res.status(400).json({message: "Password must be at least 8 characters"});
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //checing if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({message: "User already exists"});
        }


        //PASSWORD HASHING
        const salt = await bcrypt.genSalt(10);  // Dodajemy await
        const hashedPassword = await bcrypt.hash(password, salt);  // Dodajemy await


        // Creating a new User
        const newUser = await User.create([{
                name,
                email,
                password: hashedPassword
            }
            ], {session}
        );

        const token = signToken(newUser[0]._id);

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        })


        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser[0]
        });
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        console.log("Error in register route", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        //checking if user exists
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            return res.status(404).json({message: "User does not exist"});
        }

        //checking if password is correct
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }


        const token = signToken(existingUser._id);

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite:"lax",
            secure: true,
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: existingUser
        })

    } catch (e) {
        console.log("Error in sign in route", e);
        res.status(500).json({message: "Internal server error"});
    }
}

export const signOut = async (req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({success:true,message:"User logged out successfully"});
}

export const currentUser = async (req,res)=>{
    res.send({
        success: true,
        user: req.user
    })
}