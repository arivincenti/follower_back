const memberController = {};
const Member = require('../models/member');
const Area = require('../models/area');
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
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      }).populate({
        path: 'created_by',
        model: 'User',
        select: '-password'
      });

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
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      }).populate({
        path: 'created_by',
        model: 'User',
        select: '-password'
      });

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
    var saved_member = null;

    var member_exists = await Member.findOne({
      user: body.user
    }).and({
      organization: body.organization._id
    });

    if (member_exists) {

      // var index = member_exists.areas.findIndex(data => data === body.area);
      // member_exists.areas.splice(index, 1, body.area);

      member_exists.areas.push(body.area);

      saved_member = await member_exists.save();

    }else{

      var newMember = new Member({
        organization: body.organization._id,
        user: body.user,
        created_by: body.created_by,
        created_at: new Date()
      });
  
      if(body.area) newMember.areas.push(body.area);

      saved_member = await newMember.save();

    };

    var member = await Member.findOne({
        _id: saved_member._id
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      }).populate({
        path: 'created_by',
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
      }).populate({
        path: 'created_by',
        model: 'User',
        select: '-password'
      })
      .populate({
        path: 'organization',
        model: 'Organization'
      });

    if (body.deleted_at) member.deleted_at = undefined;

    if (body.areas) member.areas = areas;

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
      }).populate({
        path: 'created_by',
        model: 'User',
        select: '-password'
      })
      .populate({
        path: 'organization',
        model: 'Organization'
      });
    member.deleted_at = new Date();

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, `El miembro '${saved_member._id}' se dió de baja con éxito`, null, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
}

// ==================================================
// Get member areas
// ==================================================
memberController.getMemberAreas = async (req, res) => {
  try {
    //ID del usuario recibido por URL
    var user_id = req.params.user;
    var organization_id = req.params.organization;

    var areas_id = await Member.find({
      $and: [{
        'user': user_id
      }, {
        'organization': organization_id
      }]
    }).distinct('areas');

    var userAreas = await Area.find({
        '_id': {
          $in: areas_id
        }
      })
      .populate("organization")
      .populate({
        path: "created_by",
        model: "User",
        select: '-password'
      })
      .populate({
        path: "responsible",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    //Devolvemos la colección  n de organizaciones en las que esta involucrado el usuario
    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, userAreas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};


module.exports = memberController;