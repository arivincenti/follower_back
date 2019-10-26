const ticketController = {};
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Area = require('../models/area');

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTickets = async (req, res) => {

  var ticket = await Ticket.find();

  res.json({
    ok: true,
    data: ticket
  });
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTicket = async (req, res) => {
  res.json('Get one ticket');
}

// ==================================================
// Get all ticket
// ==================================================
ticketController.createTicket = async (req, res) => {

  try{
    var body = req.body;
  
    var ticket = new Ticket({

    });
  
    await Ticket.save()
    .then(ticket => {
      res.status(200).json({
        ok: true,
        data: ticket
      });
    })
    .catch(error => {
      res.status(400).json({
        ok:false,
        message: 'Error al guardar el ticket',
        error: error
      });
    });
  
  }catch(error){
    res.status(500).json({
      ok:false,
      message: 'Error de servidor',
      error: error
    });
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