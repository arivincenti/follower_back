const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');
const { verifyToken } = require('../middlewares/authentication');

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
router.post('/members', verifyToken, memberController.createMember);

// ==================================================
// Update a member
// ==================================================
router.put('/members/:member', verifyToken, memberController.updateMember);

// ==================================================
// Delete a member
// ==================================================
router.delete('/members/:member', verifyToken, memberController.deleteMember);

// ==================================================
// Get member areas
// ==================================================
router.get('/members/user/:user/organization/:organization/areas', memberController.getMemberAreas);


module.exports = router;