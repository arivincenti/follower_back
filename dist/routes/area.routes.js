"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const area_controller_1 = require("../controllers/area.controller");
const areaRouter = express_1.Router();
// ==================================================
// Get all areas
// ==================================================
areaRouter.get("/areas/organization/:organization", authentication_1.verifyToken, area_controller_1.getAreas);
// ==================================================
// Get all areas
// ==================================================
areaRouter.get("/areas/user/:user", area_controller_1.getAreasByUser);
// ==================================================
// Get one area
// ==================================================
areaRouter.get("/areas/:area", authentication_1.verifyToken, area_controller_1.getArea);
// ==================================================
// Create a new area
// ==================================================
areaRouter.post("/areas", authentication_1.verifyToken, area_controller_1.createArea);
// ==================================================
// Update an area
// ==================================================
areaRouter.put("/areas/:area", authentication_1.verifyToken, area_controller_1.updateArea);
// ==================================================
// Delete an area
// ==================================================
areaRouter.delete("/areas/:area", authentication_1.verifyToken, area_controller_1.deleteArea);
// ==================================================
// Get Area Members
// ==================================================
areaRouter.get("/areas/:area/members", authentication_1.verifyToken, area_controller_1.getAreaMembers);
// ==================================================
// Add Area Members
// ==================================================
areaRouter.post("/areas/create_member", authentication_1.verifyToken, area_controller_1.createAreaMember);
// ==================================================
// Delete Area Members
// ==================================================
areaRouter.patch("/areas/delete_member/:area", authentication_1.verifyToken, area_controller_1.deleteAreaMember);
// ==================================================
// Delete Area Members
// ==================================================
areaRouter.patch("/areas/set_responsible/:area", authentication_1.verifyToken, area_controller_1.setResponsibleAreaMember);
exports.default = areaRouter;
