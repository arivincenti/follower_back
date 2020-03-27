import { Router } from "express";
import {
    getUsers,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/authentication";

const userRouter = Router();

// ==================================================
// Get all users
// ==================================================
userRouter.get("/users", verifyToken, getUsers);

// ==================================================
// Get one user
// ==================================================
userRouter.get("/users/:user", verifyToken, getUser);

// ==================================================
// Get users by email
// ==================================================
userRouter.post("/users/by_email", verifyToken, getUserByEmail);

// ==================================================
// Update a user
// ==================================================
userRouter.put("/users/:user", verifyToken, updateUser);

// ==================================================
// Delete a user
// ==================================================
userRouter.delete("/users/:user", verifyToken, deleteUser);

export default userRouter;
