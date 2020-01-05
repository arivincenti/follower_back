const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller');
const { verifyToken } = require('../middlewares/authentication');

// ==================================================
// Get all organizations
// ==================================================
router.get('/organizations/user/:user', verifyToken, organizationController.getOrganizations);

// ==================================================
// Get one organization
// ==================================================
router.get('/organizations/:organization', verifyToken, organizationController.getOrganization);

// ==================================================
// Create a new Organization
// ==================================================
router.post('/organizations', verifyToken, organizationController.createOrganization);

// ==================================================
// Update a Organization
// ==================================================
router.put('/organizations/:organization', verifyToken, organizationController.updateOrganization);

// ==================================================
// Delete a Organization
// ==================================================
router.delete('/organizations/:organization', verifyToken, organizationController.deleteOrganization);


module.exports = router;