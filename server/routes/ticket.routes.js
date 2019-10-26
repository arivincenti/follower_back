const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

// ==================================================
// Get all tickets
// ==================================================
router.get('/tickets', ticketController.getTickets);

// ==================================================
// Get one ticket
// ==================================================
router.get('/tickets/:id', ticketController.getTicket);

// ==================================================
// Create a new ticket
// ==================================================
router.post('/tickets', ticketController.createTicket);

// ==================================================
// Update a ticket
// ==================================================
router.put('/tickets/:id', ticketController.updateTicket);

// ==================================================
// Delete a ticket
// ==================================================
router.delete('/tickets/:id', ticketController.deleteTicket);

module.exports = router;