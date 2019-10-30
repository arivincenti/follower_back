const ticketController = {};
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Area = require('../models/area');
const ResponseController = require('./response.controller');

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTickets = async (req, res) => {
 try{
   var tickets = await Ticket.find();
 
   if (!tickets) return ResponseController.getResponse(res, 404, false, "No existen tickets en la base de datos", "Usuarios no encontrados", null);

   ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, tickets);

 }catch(error){
  ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
 }
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTicket = async (req, res) => {
  try{
    var ticket_id = req.params.ticket;

    var ticket = await Ticket.findById(ticket_id);
  
    if (!ticket) return ResponseController.getResponse(res, 404, false, "No existen tickets en la base de datos", "Usuarios no encontrados", null);
 
    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, ticket);
 
  }catch(error){
   ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.createTicket = async (req, res) => {

  try{
    var body = req.body;
  
    var ticket = new Ticket({
      subject: body.subject,
      issue: body.issue,
      created_by: body.user,
      created_at: new Date()
    });

    var movement = {
      area: body.area,
      responsible: body.responsible,
      created_at: new Date()
    }

    ticket.movements.push(movement);
  
    var saved_ticket = await ticket.save();

    ResponseController.getResponse(res, 200, true, `El ticket '${saved_ticket._id}' se creó con éxito`, null, saved_ticket);
  
  }catch(error){
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
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