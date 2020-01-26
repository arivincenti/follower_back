const express = require('express');
const router = express.Router();
const areaController = require('../controllers/area.controller');
const { verifyToken } = require('../middlewares/authentication');

// ==================================================
// Get all areas
// ==================================================
router.get('/areas/organization/:organization', verifyToken, areaController.getAreas);

// ==================================================
// Get one area
// ==================================================
router.get('/areas/:area', verifyToken, areaController.getArea);

// ==================================================
// Create a new area
// ==================================================
router.post('/areas', verifyToken, areaController.createArea);

// ==================================================
// Update an area
// ==================================================
router.put('/areas/:area', verifyToken, areaController.updateArea);

// ==================================================
// Delete an area
// ==================================================
router.delete('/areas/:area', verifyToken, areaController.deleteArea);

// ==================================================
// Get Area Members
// ==================================================
router.get('/areas/:area/members', verifyToken, areaController.getAreaMembers);

// ==================================================
// Add Area Members
// ==================================================
router.post('/areas/add_member', verifyToken, areaController.addAreaMember);


module.exports = router;