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


module.exports = router;