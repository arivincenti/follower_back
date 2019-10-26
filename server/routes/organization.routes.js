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
router.get('/organizations/:id', organizationController.getOrganization);

// ==================================================
// Create a new Organization
// ==================================================
router.post('/organizations', organizationController.createOrganization);

// ==================================================
// Update a Organization
// ==================================================
router.put('/organizations/:id', organizationController.updateOrganization);

// ==================================================
// Delete a Organization
// ==================================================
router.delete('/organizations/:id', organizationController.deleteOrganization);

module.exports = router;