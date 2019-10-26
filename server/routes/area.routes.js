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
router.get('/areas/:id', areaController.getArea);

// ==================================================
// Create a new area
// ==================================================
router.post('/areas', areaController.createArea);

// ==================================================
// Update an area
// ==================================================
router.put('/areas/:id', areaController.updateArea);

// ==================================================
// Delete an area
// ==================================================
router.delete('/areas/:id', areaController.deleteArea);

// ==================================================
// Create an area member
// ==================================================
router.put('/areas/:area/members', areaController.createAreaMember);

// ==================================================
// Update an area member
// ==================================================
router.put('/areas/:area/members/:member', areaController.updateAreaMember);

module.exports = router;