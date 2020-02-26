import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import { getComments, addComment } from "../controllers/comment.controller";

const commentsRouter = Router();

// ==================================================
// Get all comments
// ==================================================
commentsRouter.get("/comments/:ticket", verifyToken, getComments);

// ==================================================
// Add comment
// ==================================================
commentsRouter.put("/comments/:ticket", verifyToken, addComment);

export default commentsRouter;
