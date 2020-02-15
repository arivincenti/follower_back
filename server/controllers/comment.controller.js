const commentController = {};
const Ticket = require( "../models/ticket" );
const ResponseController = require( "./response.controller" );

// ==================================================
// get comments
// ==================================================
commentController.getComments = async ( req, res ) =>
{
  try
  {
    var ticket_id = req.params.ticket;

    var ticket = await Ticket.findById( ticket_id )
      .populate( {
        path: "comments.created_by",
        model: "User",
        select: "-password"
      } );


    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      `Busqueda realizada con éxito`,
      ticket.comments.reverse()
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
// Add Comment
// ==================================================
commentController.addComment = async ( req, res ) =>
{
  try
  {
    var ticket_id = req.params.ticket;
    var body = req.body;

    var comment = {
      message: body.message,
      type: body.type,
      created_at: new Date(),
      created_by: body.created_by
    };

    var ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      {
        $push: {
          comments: comment
        }
      },
      { new: true }
    )
      .populate( {
        path: "comments.created_by",
        model: "User",
        select: "-password"
      } );

    ResponseController.getResponse(
      res,
      200,
      true,
      null,
      `El ticket '${ ticket._id }' se creó con éxito`,
      ticket.comments.pop() //Con pop devuelvo el ultimo elemento del arreglo
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

module.exports = commentController;