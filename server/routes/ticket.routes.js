const express = require( 'express' );
const router = express.Router();
const ticketController = require( '../controllers/ticket.controller' );
const { verifyToken } = require( '../middlewares/authentication' );

// ==================================================
// Get all tickets
// ==================================================
router.get( '/tickets', verifyToken, ticketController.getTickets );

// ==================================================
// Get user tickets
// ==================================================
router.get( '/tickets/user/:user', verifyToken, ticketController.getTicketsByUser );

// ==================================================
// Get one ticket
// ==================================================
router.get( '/tickets/:ticket', verifyToken, ticketController.getTicket );

// ==================================================
// Create a new ticket
// ==================================================
router.post( '/tickets', verifyToken, ticketController.createTicket );

// ==================================================
// Update a ticket
// ==================================================
router.put( '/tickets/:ticket', verifyToken, ticketController.updateTicket );


module.exports = router;
