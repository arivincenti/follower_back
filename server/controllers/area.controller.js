const areaController = {};
const Area = require("../models/area");
const Member = require("../models/member");
const ResponseController = require('./response.controller');

// ==================================================
// Get all areas
// ==================================================
areaController.getAreas = async (req, res) => {
  try {
    var areas = await Area.find()
      .populate("organization")
      .populate({
        path: "created_by",
        model: "User",
        select: '-password'
      })
      .populate({
        path: "members.user",
        model: "User",
        select: "-password"
      });

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
        path: "members.user",
        model: "User",
        select: "-password"
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
        path: "members.user",
        model: "User",
        select: "-password"
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

    if (!area) return ResponseController.getResponse(res, 404, false, `No existe el área con el id ' ${area_id}' en la base de datos`, "Área no encontrada", null);

    area.name = body.name;

    var saved_area = await area.save();

    ResponseController.getResponse(res, 200, true, `El área '${area.name}' fue modificada con éxito`, null, saved_area);

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

    var area = await Area.findById(area_id);

    if (!area) return ResponseController.getResponse(res, 404, false, `No existe el área con el id ' ${area_id}' en la base de datos`, "Área no encontrada", null);

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
        'area': area_id
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

// ==================================================
// Get members area
// ==================================================
areaController.getAreaResponsibleMembers = async (req, res) => {
  try {
    var area_id = req.params.area;

    var membersResposible = await Member.find({
        $and: [{
          'area': area_id
        }, {
          'role': 'RESPONSABLE'
        }]
      })
      .populate({
        path: 'user',
        model: 'User'
      });

    ResponseController.getResponse(res, 200, true, `La busqueda fue un éxito`, null, membersResposible);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};


module.exports = areaController;