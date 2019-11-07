const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

// ==================================================
// Get all members
// ==================================================
router.get('/members', memberController.getMembers);

// ==================================================
// Get one member
// ==================================================
router.get('/members/:member', memberController.getMember);

// ==================================================
// Create a new member
// ==================================================
router.post('/members', memberController.createMember);

// ==================================================
// Delete a member
// ==================================================
router.delete('/members/:member', memberController.deleteMember);


module.exports = router;