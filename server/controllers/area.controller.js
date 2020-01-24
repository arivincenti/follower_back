const areaController = {};
const Area = require("../models/area");
const Member = require("../models/member");
const ResponseController = require('./response.controller');

// ==================================================
// Get all areas
// ==================================================
areaController.getAreas = async (req, res) => {
  try {

    var organization_id = req.params.organization;
    var since = Number(req.query.since);
    var size = Number(req.query.size);

    var areas = await Area.find({
        organization: organization_id
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      })
      .sort({
        name: 1
      })
      .skip(since)
      .limit(size)
      .exec();

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", areas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Get an area
// ==================================================
areaController.getArea = async (req, res) => {
  try {
    var area_id = req.params.area;

    var area = await Area.findById(area_id)
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    if (!area) throw new Error('No se encontró el área');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Create an area
// ==================================================
areaController.createArea = async (req, res) => {
  try {
    var body = req.body;

    var saved_area = await Area.create({
      name: body.name,
      organization: body.organization,
      members: [],
      responsibles: [],
      created_by: body.user
    })

    var area = await Area.findById(saved_area._id)
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    ResponseController.getResponse(res, 200, true, null, `El área '${saved_area.name}' se creó con éxito`, area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Update an area
// ==================================================
areaController.updateArea = async (req, res) => {
  try {
    var area_id = req.params.area;
    var body = req.body;

    var area = await Area.findById(area_id);

    if (body.name) area.name = body.name;
    if (body.updated_by) area.updated_by = body.updated_by;
    if (body.responsible) {
      if (area.responsible) {
        if (String(area.responsible) !== body.responsible._id) {
          area.responsible = body.responsible;
        } else {
          area.responsible = undefined;
        }
      } else {
        area.responsible = body.responsible;
      }
    }

    area.updated_at = new Date();
    area.deleted_at = body.deleted_at;

    var saved_area = await area.save();

    var find_area = await Area.findById(saved_area._id)
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    ResponseController.getResponse(res, 200, true, null, `El área '${area.name}' fue modificada con éxito`, find_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Delete an area
// ==================================================
areaController.deleteArea = async (req, res) => {
  try {
    var area_id = req.params.area;

    var area = await Area.findByIdAndUpdate(area_id, {deleted_at: new Date()}, {new: true})
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    ResponseController.getResponse(res, 200, true, null, `El área '${area.name}' fue dada de baja con éxito`, area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Get Area Members
// ==================================================
areaController.getAreaMembers = async (req, res) => {
  try {

    var area_id = req.params.area;

    var area = await Area.findById(area_id);

    var members = await Member.find({
        _id: {
          $in: area.members
        }
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      });

    ResponseController.getResponse(res, 200, true, null, `La busqueda fue un éxito`, members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

// ==================================================
// Add area member
// ==================================================
areaController.addAreaMember = async (req, res) => {
  try {
    var body = req.body;

    var area = await Area.findById(body.area);

    area.members.push(body.member._id);
    area.updated_at = new Date();

    var saved_area = await area.save();

    var find_area = await Area.findById(saved_area._id)
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
      })
      .populate({
        path: "members",
        model: "Member",
        populate: {
          path: "user",
          model: "User",
          select: '-password'
        }
      });

    ResponseController.getResponse(res, 200, true, null, `El área '${area}' fue modificada con éxito`, find_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};


module.exports = areaController;