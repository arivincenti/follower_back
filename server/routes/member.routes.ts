import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getMembers,
    getMember,
    getMemberByEmail,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/member.controller";

const memberRouter = Router();

// ==================================================
// Get all members
// ==================================================
memberRouter.get(
    "/members/organization/:organization",
    verifyToken,
    getMembers
);

// ==================================================
// Get one member
// ==================================================
memberRouter.get("/members/:member", verifyToken, getMember);

// ==================================================
// Get member by email
// ==================================================
memberRouter.post("/members/by_email", verifyToken, getMemberByEmail);

// ==================================================
// Create a new member
// ==================================================
memberRouter.post("/members", verifyToken, createMember);

// ==================================================
// Update a member
// ==================================================
memberRouter.put("/members/:member", verifyToken, updateMember);

// ==================================================
// Delete a member
// ==================================================
memberRouter.delete("/members/:member", verifyToken, deleteMember);

export default memberRouter;
