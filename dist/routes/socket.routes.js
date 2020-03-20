"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socket_controller_1 = require("../controllers/socket.controller");
const socketRouter = express_1.Router();
// ==================================================
// Count room clients
// ==================================================
socketRouter.get("/countClient/:room", socket_controller_1.countClients);
exports.default = socketRouter;
