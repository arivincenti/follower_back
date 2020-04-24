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
// Create a new member
// ==================================================
memberRouter.post("/members", authentication_1.verifyToken, member_controller_1.createMember);
// ==================================================
// Update a member
// ==================================================
memberRouter.patch("/members/activate_member/:member", authentication_1.verifyToken, member_controller_1.activateMember);
// ==================================================
// Delete a member
// ==================================================
memberRouter.patch("/members/desactivate_member/:member", authentication_1.verifyToken, member_controller_1.desactivateMember);
exports.default = memberRouter;
