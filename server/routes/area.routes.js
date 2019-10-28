const express = require('express');
const router = express.Router();
const areaController = require('../controllers/area.controller');

// ==================================================
// Get all areas
// ==================================================
router.get('/areas', areaController.getAreas);


// ==================================================
// Get one area
// ==================================================
router.get('/areas/:area', areaController.getArea);

// ==================================================
// Create a new area
// ==================================================
router.post('/areas', areaController.createArea);

// ==================================================
// Update an area
// ==================================================
router.put('/areas/:area', areaController.updateArea);

// ==================================================
// Delete an area
// ==================================================
router.delete('/areas/:area', areaController.deleteArea);

// ==================================================
// Get area members
// ==================================================
router.get('/areas/:area/members', areaController.getAreaMembers);

// ==================================================
// Create an area member
// ==================================================
router.put('/areas/:area/members', areaController.createAreaMember);

// ==================================================
// Update an area member
// ==================================================
router.put('/areas/:area/members/:member', areaController.updateAreaMember);

// ==================================================
// Delete an area member
// ==================================================
router.delete('/areas/:area/members/:member', areaController.deleteAreaMember);

module.exports = router;