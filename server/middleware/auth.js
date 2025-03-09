import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({message: "Not authorized - no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "Not authorized - invalid token"});
        }
        const currentUser= await User.findById(decoded.userId).select("-password");

        req.user = currentUser
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            status:false,
            message: "Not authorized"});
    }
}