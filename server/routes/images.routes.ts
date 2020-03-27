import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import { getImage, uploadFile } from "../controllers/images.controller";

const imageRouter = Router();

// ==================================================
// Obtener imagenes
// ==================================================
imageRouter.get("/images/:genre/:img", getImage);

// ==================================================
// Subir archivos al server
// ==================================================
imageRouter.put("/images/upload/:id", verifyToken, uploadFile);

export default imageRouter;
