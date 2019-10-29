const areaController = {};
const Area = require("../models/area");
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

    if (!areas) ResponseController.getResponse(res, 404, false, "No existen áreas en la base de datos", "Error al buscar las áreas", null);

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
      .populate("created_by")
      .populate({
        path: "members.user",
        model: "User",
        select: "-password"
      });

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con id '${area_id}'`, "Área no encontrada", null);

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

    var area = new Area({
      name: body.name,
      organization: body.organization,
      created_by: body.user
    });

    var saved_area = await area.save();

    ResponseController.getResponse(res, 200, true, `El área '${saved_area.name}' se creó con éxito`, null, saved_area);

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

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id ' ${area_id}' en la base de datos`, "Área no encontrada", null);

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

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id ' ${area_id}' en la base de datos`, "Área no encontrada", null);

    area.deleted_at = new Date();

    var deleted_area = await area.save();

    ResponseController.getResponse(res, 200, true, `El área '${area.name}' fue dada de baja con éxito`, null, deleted_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Update members area
// ==================================================
areaController.getAreaMembers = async (req, res) => {
  try {
    var area_id = req.params.area;

    var area = await Area.findById(area_id)
      .populate({
        path: "members.user",
        model: "User",
        select: '-password'
      });


    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id '${area_id}' en la base de datos`, "Área no encontrada", null);


    if (!area.members) ResponseController.getResponse(res, 404, false, "No existen el miembros en la base de datos", "Miembro no encontrado", null);

    //sent respnse to client
    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, area.members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Create members area
// ==================================================
areaController.createAreaMember = async (req, res) => {
  try {
    var area_id = req.params.area;
    var body = req.body;

    var area = await Area.findById(area_id);

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id '${area_id}' en la base de datos`, "Área no encontrada", null);

    var member = {
      user: body.user,
      role: body.role
    };

    area.members.push(member);

    var saved_area = await area.save();

    ResponseController.getResponse(res, 200, true, `Área modificada con éxito, se generó un nuevo miembro en '${area.name}'`, null, saved_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Update members area
// ==================================================
areaController.updateAreaMember = async (req, res) => {
  try {
    var area_id = req.params.area;
    var member_id = req.params.member;
    var body = req.body;

    var area = await Area.findById(area_id);

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id '${area_id}' en la base de datos`, "Área no encontrada", null);

    var member = area.members.id(member_id);

    if (!member) ResponseController.getResponse(res, 404, false, `No existe el miembro con el id '${member_id}' en la base de datos`, "Miembro no encontrado", null);

    member["role"] = body.role;
    member["updated_at"] = new Date();

    var saved_area = await area.save();

    //sent respnse to client
    ResponseController.getResponse(res, 200, true, `Área modificada con éxito, se actualizaron los datos del miembro de '${area.name}'`, null, saved_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Update members area
// ==================================================
areaController.deleteAreaMember = async (req, res) => {
  try {
    var area_id = req.params.area;
    var member_id = req.params.member;

    var area = await Area.findById(area_id);

    if (!area) ResponseController.getResponse(res, 404, false, `No existe el área con el id '${area_id}' en la base de datos`, "Área no encontrada", null); 

    var member = area.members.id(member_id);

    if (!member) ResponseController.getResponse(res, 404, false, `No existe el miembro con el id '${member_id}' en la base de datos`, "Miembro no encontrado", null);

    member["deleted_at"] = new Date();

    var saved_area = await area.save();

    //sent respnse to client
    ResponseController.getResponse(res, 200, true, `Área modificada con éxito, se dio de baja el miembro de '${area.name}'`, null, saved_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

module.exports = areaController;