import { Router } from "express";
import { countClients, getClients } from "../controllers/socket.controller";

const socketRouter = Router();

// ==================================================
// Count room clients
// ==================================================
socketRouter.get("/countClient/:room", countClients);

// ==================================================
// Count room clients
// ==================================================
socketRouter.get("/clients", getClients);

export default socketRouter;
