import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getAreas,
    getArea,
    createArea,
    updateArea,
    getAreaMembers,
    getAreasByUser,
    deleteAreaMember,
    createAreaMember,
    setResponsibleAreaMember,
    activateArea,
    desactivateArea,
} from "../controllers/area.controller";

const areaRouter = Router();

// ==================================================
// Get all areas
// ==================================================
areaRouter.get("/areas/organization/:organization", verifyToken, getAreas);

// ==================================================
// Get all areas
// ==================================================
areaRouter.get("/areas/user/:user", getAreasByUser);

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
// Activate an area
// ==================================================
areaRouter.patch("/areas/activate_area/:area", verifyToken, activateArea);

// ==================================================
// Desactivate an area
// ==================================================
areaRouter.patch("/areas/desactivate_area/:area", verifyToken, desactivateArea);

// ==================================================
// Get Area Members
// ==================================================
areaRouter.get("/areas/:area/members", verifyToken, getAreaMembers);

// ==================================================
// Add Area Members
// ==================================================
areaRouter.post("/areas/create_member", verifyToken, createAreaMember);

// ==================================================
// Delete Area Members
// ==================================================
areaRouter.patch("/areas/delete_member/:area", verifyToken, deleteAreaMember);

// ==================================================
// Delete Area Members
// ==================================================
areaRouter.patch(
    "/areas/set_responsible/:area",
    verifyToken,
    setResponsibleAreaMember
);

export default areaRouter;
