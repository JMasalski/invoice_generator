import {User} from "../models/user.model.js";

export const updateUser = async (req, res) => {
    try {
        const {...data} = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, {
            ...data
        }, {new: true}).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            success: true,
            user
        })

    } catch (e) {
        console.log("Error in update user route", e);
        return res.status(500).json({message: "Internal server error"});
    }
}


export const deleteUser = async (req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    }catch (e) {
        console.log("Error in delete user route", e);
        return res.status(500).json({message: "Internal server error"});
    }
}