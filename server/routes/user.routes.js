import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const userRoutes = Router();

//http://localhost:3000/api/v1/users/update
userRoutes.put('/update/', protectRoute, updateUser);
//http://localhost:3000/api/v1/users/delete
userRoutes.delete('/delete/', protectRoute, deleteUser);




export default userRoutes;
