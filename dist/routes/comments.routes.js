"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const comment_controller_1 = require("../controllers/comment.controller");
const commentsRouter = express_1.Router();
// ==================================================
// Get all comments
// ==================================================
commentsRouter.get("/comments/:ticket", authentication_1.verifyToken, comment_controller_1.getComments);
// ==================================================
// Add comment
// ==================================================
commentsRouter.post("/comments", authentication_1.verifyToken, comment_controller_1.addComment);
exports.default = commentsRouter;
