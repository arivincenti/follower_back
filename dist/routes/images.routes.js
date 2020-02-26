"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const images_controller_1 = require("../controllers/images.controller");
const imageRouter = express_1.Router();
// ==================================================
// Obtener imagenes
// ==================================================
imageRouter.get("/images/:img", images_controller_1.getImage);
// ==================================================
// Subir archivos al server
// ==================================================
imageRouter.put("/images/upload/:id", authentication_1.verifyToken, images_controller_1.uploadFile);
exports.default = imageRouter;
