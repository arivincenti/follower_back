const ticketController = {};
const Ticket = require( "../models/ticket" );
const Member = require( "../models/member" );
const ResponseController = require( "./response.controller" );

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTickets = async ( req, res ) =>
{
  try
  {
    var tickets = await Ticket.find()
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      "La búsqueda fue un éxito",
      tickets
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

// ==================================================
// Get user ticket
// ==================================================
ticketController.getTicketsByUser = async ( req, res ) =>
{
  try
  {
    var user = req.params.user;

    var members = await Member.find( { user: user } );

    var tickets = await Ticket.find(
      {
        $or: [
          { created_by: user },
          { responsible: { $in: members } }
        ],
      }
    )
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      "La búsqueda fue un éxito",
      tickets
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.getTicket = async ( req, res ) =>
{
  try
  {
    var ticket_id = req.params.ticket;

    var ticket = await Ticket.findById( ticket_id )
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      "La búsqueda fue un éxito",
      ticket
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

// ==================================================
// Get all ticket
// ==================================================
ticketController.createTicket = async ( req, res ) =>
{
  try
  {
    var body = req.body;

    var ticket = new Ticket( {
      subject: body.subject,
      issue: body.issue,
      area: body.area,
      responsible: [],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      created_by: body.created_by,
      created_at: new Date()
    } );

    var movement = {
      area: body.area,
      responsible: [],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      created_at: new Date(),
      created_by: body.created_by
    };

    // movement.responsible.push(body.responsible);

    ticket.movements.push( movement );

    var saved_ticket = await ticket.save();

    ticket = await Ticket.findById( saved_ticket._id )
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      `El ticket '${ ticket._id }' se creó con éxito`,
      ticket
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

// ==================================================
// Update ticket
// ==================================================
ticketController.updateTicket = async ( req, res ) =>
{
  try
  {
    var ticket_id = req.params.ticket;
    var body = req.body;

    var ticket = {
      area: body.area,
      responsible: [ ...body.responsible ],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      updated_by: body.created_by,
      updated_at: new Date()
    };

    var movement = {
      area: body.area,
      responsible: [ ...body.responsible ],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      created_at: new Date(),
      created_by: body.created_by
    };

    var ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      {
        ...ticket,
        $push: {
          movements: movement
        }
      },
      { new: true }
    )
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      `El ticket '${ ticket._id }' se creó con éxito`,
      ticket
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

// ==================================================
// Update ticket
// ==================================================
ticketController.updateTicket = async ( req, res ) =>
{
  try
  {
    var ticket_id = req.params.ticket;
    var body = req.body;

    var ticket = {
      area: body.area,
      responsible: [ ...body.responsible ],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      updated_by: body.created_by,
      updated_at: new Date()
    };

    var movement = {
      area: body.area,
      responsible: [ ...body.responsible ],
      followers: [],
      priority: body.priority,
      status: "ABIERTO",
      created_at: new Date(),
      created_by: body.created_by
    };

    var ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      {
        ...ticket,
        $push: {
          movements: movement
        }
      },
      { new: true }
    )
      .populate( {
        path: "created_by",
        model: "User",
        select: "-password"
      } )
      .populate( {
        path: "area",
        model: "Area"
      } )
      .populate( {
        path: "area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "responsible",
        model: "Member"
      } )
      .populate( {
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } )
      .populate( {
        path: "movements.area",
        model: "Area"
      } )
      .populate( {
        path: "movements.area",
        model: "Area",
        populate: {
          path: "organization",
          model: "Organization"
        }
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member"
      } )
      .populate( {
        path: "movements.responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User"
        }
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      `El ticket '${ ticket._id }' se creó con éxito`,
      ticket
    );
  } catch ( error )
  {
    ResponseController.getResponse(
      res,
      500,
      false,
      "Error de servidor",
      error.message,
      null
    );
  }
};

module.exports = ticketController;
