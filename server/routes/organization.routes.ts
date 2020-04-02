import { Router } from "express";
import { verifyToken } from "../middlewares/authentication";
import {
    getOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    activateOrganization,
    desactivateOrganization
} from "../controllers/organization.controller";

const organizationRouter = Router();

// ==================================================
// Get all organizations
// ==================================================
organizationRouter.get(
    "/organizations/user/:user",
    verifyToken,
    getOrganizations
);

// ==================================================
// Get one organization
// ==================================================
organizationRouter.get(
    "/organizations/:organization",
    verifyToken,
    getOrganization
);

// ==================================================
// Create a new Organization
// ==================================================
organizationRouter.post("/organizations", verifyToken, createOrganization);

// ==================================================
// Update a Organization
// ==================================================
organizationRouter.put(
    "/organizations/:organization",
    verifyToken,
    updateOrganization
);

// ==================================================
// Delete a Organization
// ==================================================
organizationRouter.patch(
    "/organizations/activate_organization/:organization",
    verifyToken,
    activateOrganization
);

// ==================================================
// Delete a Organization
// ==================================================
organizationRouter.patch(
    "/organizations/desactivate_organization/:organization",
    verifyToken,
    desactivateOrganization
);

export default organizationRouter;
