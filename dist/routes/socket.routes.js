"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express_1 = require("Express");
const socket_controller_1 = require("../controllers/socket.controller");
const socketRouter = Express_1.Router();
// ==================================================
// Count room clients
// ==================================================
socketRouter.get("/countClient/:room", socket_controller_1.countClients);
exports.default = socketRouter;
