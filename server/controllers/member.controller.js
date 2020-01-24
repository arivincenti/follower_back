const memberController = {};
const Member = require('../models/member');
const User = require('../models/user');
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

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get a member
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

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}


// ==================================================
// Get member by email
// ==================================================
memberController.getMemberByEmail = async (req, res) => {
  try {
    var email = req.body.email;
    var organization = req.body.organization;
    var users = [];
    var members = [];

    if (email) {
      users = await User.find({
        email: {
          $regex: email,
          $options: 'i'
        }
      }).limit(5);

      members = await Member.find({
          'user': {
            $in: users
          }
        }).and({
          'organization': organization
        })
        .populate({
          path: 'user',
          model: 'User',
          select: '-password'
        }).populate({
          path: 'created_by',
          model: 'User',
          select: '-password'
        })
        .limit(5);

    }

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Create a member
// ==================================================
memberController.createMember = async (req, res) => {

  try {
    var body = req.body;

    var newMember = new Member({
      organization: body.organization._id,
      user: body.user,
      created_by: body.created_by,
      created_at: new Date()
    });

    saved_member = await newMember.save();

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

    ResponseController.getResponse(res, 200, true, null, `El miembro '${member._id}' se creó con éxito`, member);

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

    member.updated_at = new Date();

    var saved_member = await member.save();

    ResponseController.getResponse(res, 200, true, null, `El miembro '${saved_member._id}' se modificó con éxito`, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
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

    ResponseController.getResponse(res, 200, true, null, `El miembro '${saved_member._id}' se dió de baja con éxito`, saved_member);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
}

// ==================================================
// Get member areas
// ==================================================
// memberController.getMemberAreas = async (req, res) => {
//   try {

//     var user_id = req.params.user;
//     var organization_id = req.params.organization;

//     var areas_id = await Member.find({
//       $and: [{
//         'user': user_id
//       }, {
//         'organization': organization_id
//       }]
//     }).distinct('areas');

//     var userAreas = await Area.find({
//         '_id': {
//           $in: areas_id
//         }
//       })
//       .populate("organization")
//       .populate({
//         path: "created_by",
//         model: "User",
//         select: '-password'
//       })
//       .populate({
//         path: "responsible",
//         model: "Member",
//         populate: {
//           path: "user",
//           model: "User",
//           select: '-password'
//         }
//       });

//     ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", userAreas);

//   } catch (error) {
//     ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
//   }
// };


module.exports = memberController;