const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller');

// ==================================================
// Get all organizations
// ==================================================
router.get('/organizations', organizationController.getOrganizations);

// ==================================================
// Get one organization
// ==================================================
router.get('/organizations/:organization', organizationController.getOrganization);

// ==================================================
// Create a new Organization
// ==================================================
router.post('/organizations', organizationController.createOrganization);

// ==================================================
// Update a Organization
// ==================================================
router.put('/organizations/:organization', organizationController.updateOrganization);

// ==================================================
// Delete a Organization
// ==================================================
router.delete('/organizations/:organization', organizationController.deleteOrganization);


module.exports = router;