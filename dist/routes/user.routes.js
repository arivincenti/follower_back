"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authentication_1 = require("../middlewares/authentication");
const userRouter = express_1.Router();
// ==================================================
// Get all users
// ==================================================
userRouter.get("/users", user_controller_1.getUsers);
// ==================================================
// Get one user
// ==================================================
userRouter.get("/users/:user", user_controller_1.getUser);
// ==================================================
// Get users by email
// ==================================================
userRouter.post("/users/by_email", authentication_1.verifyToken, user_controller_1.getUserByEmail);
// ==================================================
// Update a user
// ==================================================
userRouter.put("/users/:user", authentication_1.verifyToken, user_controller_1.updateUser);
// ==================================================
// Delete a user
// ==================================================
userRouter.delete("/users/:user", authentication_1.verifyToken, user_controller_1.deleteUser);
// ==================================================
// Clients
// ==================================================
userRouter.get("/clients", user_controller_1.getClients);
exports.default = userRouter;
