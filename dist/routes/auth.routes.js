"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.Router();
// ==================================================
// Register
// ==================================================
authRouter.post("/auth/register", auth_controller_1.register);
// ==================================================
// Login
// ==================================================
authRouter.post("/auth/login", auth_controller_1.login);
// ==================================================
// RefreshToken
// ==================================================
authRouter.get("/auth/refreshToken", auth_controller_1.refreshToken);
exports.default = authRouter;
