import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getAreas,
    getArea,
    createArea,
    updateArea,
    deleteArea,
    getAreaMembers,
    addAreaMember
} from "../controllers/area.controller";

const areaRouter = Router();

// ==================================================
// Get all areas
// ==================================================
areaRouter.get("/areas/organization/:organization", verifyToken, getAreas);

// ==================================================
// Get one area
// ==================================================
areaRouter.get("/areas/:area", verifyToken, getArea);

// ==================================================
// Create a new area
// ==================================================
areaRouter.post("/areas", verifyToken, createArea);

// ==================================================
// Update an area
// ==================================================
areaRouter.put("/areas/:area", verifyToken, updateArea);

// ==================================================
// Delete an area
// ==================================================
areaRouter.delete("/areas/:area", verifyToken, deleteArea);

// ==================================================
// Get Area Members
// ==================================================
areaRouter.get("/areas/:area/members", verifyToken, getAreaMembers);

// ==================================================
// Add Area Members
// ==================================================
areaRouter.post("/areas/add_member", verifyToken, addAreaMember);

export default areaRouter;
