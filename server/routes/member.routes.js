const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

// ==================================================
// Get all members
// ==================================================
router.get('/members/organization/:organization', memberController.getMembers);

// ==================================================
// Get one member
// ==================================================
router.get('/members/:member', memberController.getMember);

// ==================================================
// Create a new member
// ==================================================
router.post('/members', memberController.createMember);

// ==================================================
// Update a member
// ==================================================
router.put('/members/:member', memberController.updateMember);

// ==================================================
// Delete a member
// ==================================================
router.delete('/members/:member', memberController.deleteMember);


module.exports = router;