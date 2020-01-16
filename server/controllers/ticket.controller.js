const ticketController = {};
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Area = require('../models/area');
const ResponseController = require('./response.controller');

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTickets = async (req, res) => {
  try {
    var tickets = await Ticket.find();

    if (!tickets) throw new Error('No se encontraron tickets');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", tickets);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

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
        path: 'movements.area',
        model: 'Area'
      });

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", tickets);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTicket = async (req, res) => {
  try {
    var ticket_id = req.params.ticket;

    var ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new Error('No se encontró el ticket');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", ticket);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.createTicket = async (req, res) => {

  try {
    var body = req.body;

    var ticket = new Ticket({
      subject: body.subject,
      issue: body.issue,
      created_by: body.user,
      created_at: new Date()
    });

    var movement = {
      area: body.area,
      responsible: [],
      followers: [],
      created_at: new Date(),
      priority: body.priority
    }

    // movement.responsible.push(body.responsible);

    ticket.movements.push(movement);

    var saved_ticket = await ticket.save();

    ResponseController.getResponse(res, 200, true, null, `El ticket '${saved_ticket._id}' se creó con éxito`, saved_ticket);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.updateTicket = async (req, res) => {
  res.json('Update a ticket');
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.deleteTicket = async (req, res) => {
  res.json('Delete a ticket');
}


module.exports = ticketController;