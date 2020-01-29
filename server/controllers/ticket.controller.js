const ticketController = {};
const Ticket = require('../models/ticket');
const bcrypt = require('bcryptjs');
const ResponseController = require('./response.controller');

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTickets = async (req, res) => {
	try {
		var tickets = await Ticket.find()
			.populate({
				path: 'created_by',
				model: 'User',
				select: '-password'
			})
			.populate({
				path: 'movements.area',
				model: 'Area'
			})
			.populate({
				path: 'movements.area',
				model: 'Area',
				populate: {
					path: 'organization',
					model: 'Organization'
				}
			});

		ResponseController.getResponse(res, 200, true, null, 'La búsqueda fue un éxito', tickets);
	} catch (error) {
		ResponseController.getResponse(res, 500, false, 'Error de servidor', error.message, null);
	}
};

// ==================================================
// Get user ticket
// ==================================================
ticketController.getTicketsByUser = async (req, res) => {
	try {
		var user = req.params.user;

		var tickets = await Ticket.find({
			created_by: user
		})
			.populate({
				path: 'created_by',
				model: 'User',
				select: '-password'
			})
			.populate({
				path: 'movements.area',
				model: 'Area'
			})
			.populate({
				path: 'movements.area',
				model: 'Area',
				populate: {
					path: 'organization',
					model: 'Organization'
				}
			});

		ResponseController.getResponse(res, 200, true, null, 'La búsqueda fue un éxito', tickets);
	} catch (error) {
		ResponseController.getResponse(res, 500, false, 'Error de servidor', error.message, null);
	}
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTicket = async (req, res) => {
	try {
		var ticket_id = req.params.ticket;

		var ticket = await Ticket.findById(ticket_id)
			.populate({
				path: 'created_by',
				model: 'User',
				select: '-password'
			})
			.populate({
				path: 'movements.area',
				model: 'Area'
			})
			.populate({
				path: 'movements.area',
				model: 'Area',
				populate: {
					path: 'organization',
					model: 'Organization'
				}
			})
			.populate({
				path: 'movements.responsible',
				model: 'Member'
			})
			.populate({
				path: 'movements.responsible',
				model: 'Member',
				populate: {
					path: 'user',
					model: 'User'
				}
			});

		ResponseController.getResponse(res, 200, true, null, 'La búsqueda fue un éxito', ticket);
	} catch (error) {
		ResponseController.getResponse(res, 500, false, 'Error de servidor', error.message, null);
	}
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.createTicket = async (req, res) => {
	try {
		var body = req.body;

		var ticket = new Ticket({
			subject: body.subject,
			issue: body.issue,
			created_by: body.created_by,
			created_at: new Date()
		});

		var movement = {
			area: body.area,
			responsible: [],
			followers: [],
			priority: body.priority,
			status: 'ABIERTO',
			created_at: new Date(),
			created_by: body.created_by
		};

		// movement.responsible.push(body.responsible);

		ticket.movements.push(movement);

		var saved_ticket = await ticket.save();

		ticket = await Ticket.findById(saved_ticket._id)
			.populate({
				path: 'created_by',
				model: 'User',
				select: '-password'
			})
			.populate({
				path: 'movements.area',
				model: 'Area'
			})
			.populate({
				path: 'movements.area',
				model: 'Area',
				populate: {
					path: 'organization',
					model: 'Organization'
				}
			});

		ResponseController.getResponse(
			res,
			200,
			true,
			null,
			`El ticket '${ticket._id}' se creó con éxito`,
			ticket
		);
	} catch (error) {
		ResponseController.getResponse(res, 500, false, 'Error de servidor', error.message, null);
	}
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.updateTicket = async (req, res) => {
	res.json('Update a ticket');
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.deleteTicket = async (req, res) => {
	res.json('Delete a ticket');
};

module.exports = ticketController;
