const express = require( 'express' );
const router = express.Router();
const commentController = require( '../controllers/comment.controller' );
const { verifyToken } = require( '../middlewares/authentication' );

// ==================================================
// Get all comments
// ==================================================
router.get( '/comments/:ticket', verifyToken, commentController.getComments );

// ==================================================
// Add comment
// ==================================================
router.put( '/comments/:ticket', verifyToken, commentController.addComment );

module.exports = router;
