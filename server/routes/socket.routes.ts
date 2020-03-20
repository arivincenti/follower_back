import { Router } from "express";
import { countClients } from "../controllers/socket.controller";

const socketRouter = Router();

// ==================================================
// Count room clients
// ==================================================
socketRouter.get("/countClient/:room", countClients);

export default socketRouter;
