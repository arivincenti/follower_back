"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const organization_controller_1 = require("../controllers/organization.controller");
const organizationRouter = express_1.Router();
// ==================================================
// Get all organizations
// ==================================================
organizationRouter.get("/organizations/user/:user", authentication_1.verifyToken, organization_controller_1.getOrganizations);
// ==================================================
// Get one organization
// ==================================================
organizationRouter.get("/organizations/:organization", authentication_1.verifyToken, organization_controller_1.getOrganization);
// ==================================================
// Create a new Organization
// ==================================================
organizationRouter.post("/organizations", authentication_1.verifyToken, organization_controller_1.createOrganization);
// ==================================================
// Update a Organization
// ==================================================
organizationRouter.put("/organizations/:organization", authentication_1.verifyToken, organization_controller_1.updateOrganization);
// ==================================================
// Delete a Organization
// ==================================================
organizationRouter.put("/organizations/delete/:organization", authentication_1.verifyToken, organization_controller_1.deleteOrganization);
exports.default = organizationRouter;
