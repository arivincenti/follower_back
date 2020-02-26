"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const member_controller_1 = require("../controllers/member.controller");
const memberRouter = express_1.Router();
// ==================================================
// Get all members
// ==================================================
memberRouter.get("/members/organization/:organization", authentication_1.verifyToken, member_controller_1.getMembers);
// ==================================================
// Get one member
// ==================================================
memberRouter.get("/members/:member", authentication_1.verifyToken, member_controller_1.getMember);
// ==================================================
// Get member by email
// ==================================================
memberRouter.post("/members/by_email", authentication_1.verifyToken, member_controller_1.getMemberByEmail);
// ==================================================
// Create a new member
// ==================================================
memberRouter.post("/members", authentication_1.verifyToken, member_controller_1.createMember);
// ==================================================
// Update a member
// ==================================================
memberRouter.put("/members/:member", authentication_1.verifyToken, member_controller_1.updateMember);
// ==================================================
// Delete a member
// ==================================================
memberRouter.delete("/members/:member", authentication_1.verifyToken, member_controller_1.deleteMember);
exports.default = memberRouter;
