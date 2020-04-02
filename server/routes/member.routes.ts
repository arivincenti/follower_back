import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getMembers,
    getMember,
    getMemberByEmail,
    createMember,
    activateMember,
    desactivateMember
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
memberRouter.patch(
    "/members/activate_member/:member",
    verifyToken,
    activateMember
);

// ==================================================
// Delete a member
// ==================================================
memberRouter.patch(
    "/members/desactivate_member/:member",
    verifyToken,
    desactivateMember
);

export default memberRouter;
