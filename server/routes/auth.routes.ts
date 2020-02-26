import { Router } from "express";
import { register, login, refreshToken } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authentication";

const authRouter = Router();

// ==================================================
// Register
// ==================================================
authRouter.post("/auth/register", register);

// ==================================================
// Login
// ==================================================
authRouter.post("/auth/login", login);

// ==================================================
// RefreshToken
// ==================================================
authRouter.get("/auth/refreshToken", refreshToken);

export default authRouter;
