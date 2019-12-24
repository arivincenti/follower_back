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
      }).sort({
        name: 1
      })
      .skip(since)
      .limit(size)
      .exec();;

    if (!areas) return ResponseController.getResponse(res, 404, false, "No existen áreas en la base de datos", "Error al buscar las áreas", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, areas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
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
      });

    // if (!area) return ResponseController.getResponse(res, 404, false, `No existe el área con id '${area_id}'`, "Área no encontrada", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Create an area
// ==================================================
areaController.createArea = async (req, res) => {
  try {
    var body = req.body;

    // var saved_area = await area.save();

    var saved_area = await Area.create({
      name: body.name,
      organization: body.organization,
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
      });

    ResponseController.getResponse(res, 200, true, `El área '${saved_area.name}' se creó con éxito`, null, area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
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
    if (body.deleted_at) area.deleted_at = undefined;
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
      });

    ResponseController.getResponse(res, 200, true, `El área '${area.name}' fue modificada con éxito`, null, find_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Delete an area
// ==================================================
areaController.deleteArea = async (req, res) => {
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
      });

    // if (body.updated_by) area.updated_at = body.user;

    area.deleted_at = new Date();

    var deleted_area = await area.save();

    ResponseController.getResponse(res, 200, true, `El área '${area.name}' fue dada de baja con éxito`, null, deleted_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Get Area Members
// ==================================================
areaController.getAreaMembers = async (req, res) => {
  try {
    var area_id = req.params.area;

    var members = await Member.find({
        areas: {
          $in: area_id
        }
      })
      .populate({
        path: 'user',
        model: 'User',
        select: '-password'
      });

    ResponseController.getResponse(res, 200, true, `La busqueda fue un éxito`, null, members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};


module.exports = areaController;