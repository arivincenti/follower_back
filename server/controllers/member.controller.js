const memberController = {};
const Member = require('../models/member');
const ResponseController = require('./response.controller');

// ==================================================
// Get all members
// ==================================================
memberController.getMembers = async (req, res) => {
  try {
    var organization_id = req.params.organization;

    var members = await Member.find({
      organization: organization_id
    })
    .populate(
      {
        path: 'user',
        model: 'User',
        select: '-password'
      }
    );

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get an member
// ==================================================
memberController.getMember = async (req, res) => {
  try {
    var member_id = req.params.member;

    var member = await Member.findById(member_id)
    .populate(
      {
        path: 'user',
        model: 'User',
        select: '-password'
      }
    ).populate(
      {
        path: 'created_by',
        model: 'User',
        select: '-password'
      }
    );
    
    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Create a member
// ==================================================
memberController.createMember = async (req, res) => {

  try {
    var body = req.body;

    var member_exists = await Member.find({user: body.user}).and({organization: body.organization});

    if(member_exists.length) throw new Error('El usuario ya existe');

    var newMember = new Member({
      organization: body.organization,
      // area: body.area,
      user: body.user,
      created_by: body.created_by,
      created_at: new Date()
    });

    var saved_member = await newMember.save();

    var member = await Member.findOne({
        _id: saved_member._id
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      });

    ResponseController.getResponse(res, 200, true, `El miembro '${member._id}' se creó con éxito`, null, member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Update a member
// ==================================================
memberController.updateMember = async (req, res) => {
  try {
    var member_id = req.params.member;
    var body = req.body;
    var areas = body.areas;

    var member = await Member.findById(member_id)
      .populate({
        path: 'user',
        model: 'User',
        select: '-_password'
      })
      .populate({
        path: 'organization',
        model: 'Organization'
      });

    // member.role = memberRole;
    member.areas = areas;

    member.updated_at = new Date();

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, `El miembro '${saved_member._id}' se modificó con éxito`, null, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Delete a member
// ==================================================
memberController.deleteMember = async (req, res) => {
  try {
    var member_id = req.params.member;

    var member = await Member.findById(member_id)
      .populate({
        path: 'user',
        model: 'User',
        select: '-_password'
      });;

    // if (!member) return ResponseController.getResponse(res, 404, false, `No existe el miembro con id '${member_id}' en la base de datos`, "Error al buscar el miembro", null);

    member.deleted_at = new Date();

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, `El miembro '${saved_member._id}' se dió de baja con éxito`, null, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

module.exports = memberController;