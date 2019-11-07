const memberController = {};
const bcrypt = require('bcryptjs');
const Member = require('../models/member');
const ResponseController = require('./response.controller');

// ==================================================
// Get all members
// ==================================================
memberController.getMembers = async (req, res) => {
  try {
    var members = await Member.find();

    if (!members) return ResponseController.getResponse(res, 404, false, "No existen miembros en la base de datos", "Miembros no encontrados", null);

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

    var member = await Member.findById(member_id);

    if (!member) return ResponseController.getResponse(res, 404, false, `No existe el miembro con id '${member_id}' en la base de datos`, "Error al buscar el miembro", null);

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

    var member = new Member({
      organization: body.organization,
      area: body.area,
      user: body.user,
      role: body.role,
      created_at: new Date()
    });

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, `El miembro '${saved_member._id}' se creó con éxito`, null, saved_member);

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

    var member = await Member.findById(member_id);

    if (!member) return ResponseController.getResponse(res, 404, false, `No existe el miembro con id '${member_id}' en la base de datos`, "Error al buscar el miembro", null);

    member.deleted_at = new Date();

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, `El miembro '${saved_member._id}' se dió de baja con éxito`, null, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

module.exports = memberController;