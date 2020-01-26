const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');
const { verifyToken } = require('../middlewares/authentication');

// ==================================================
// Get all members
// ==================================================
router.get('/members/organization/:organization', verifyToken, memberController.getMembers);

// ==================================================
// Get one member
// ==================================================
router.get('/members/:member', verifyToken, memberController.getMember);

// ==================================================
// Get member by email
// ==================================================
router.post('/members/by_email', verifyToken, memberController.getMemberByEmail);

// ==================================================
// Create a new member
// ==================================================
router.post('/members', verifyToken, memberController.createMember);

// ==================================================
// Update a member
// ==================================================
router.put('/members/:member', verifyToken, memberController.updateMember);

// ==================================================
// Delete a member
// ==================================================
router.delete('/members/:member', verifyToken, memberController.deleteMember);


module.exports = router;