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
      .populate("created_by")
      .populate({
        path: "members.user",
        model: "User",
        select: "-password"
      });

    if (!area) return ResponseController.getResponse(res, 404, false, `No existe el área con id '${area_id}'`, "Área no encontrada", null);

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
// Create members area
// ==================================================
areaController.createAreaMember = async (req, res) => {
  try {
    //Recibimos los parametros tanto del body como de la URL
    var area_id = req.params.area;
    var body = req.body;
    var user_id = body.user;

    //Buscamos el área según el id que viene de la URL
    var area = await Area.findById(area_id);

    //Validamos que el área exista
    if (!area) return ResponseController.getResponse(res, 404, false, `No existe el área con el id '${area_id}' en la base de datos`, "Área no encontrada", null);

    //Con los datos del area encontrada, buscamos la organización y el usuario que se quiere agregar, para ver si ya no existe en alguna otra área de esa organización
    var organizationMembers = await Area.find().and([{
      "organization": area.organization
    }, {
      "members.user": user_id
    }]);

    //Si el usuario ya existe en un área, no se va a poder agregar en otra
    if (organizationMembers[0].members.length) return ResponseController.getResponse(res, 400, false, `Problema al crear un miembro para el area ${area.name}`, `El usuario con id ${user_id} pertenece al área ${organizationMembers[0].name}`, null);

    //En caso de que la validación pase, se crea el miembro nuevo del área
    var member = {
      user: body.user,
      role: body.role
    };

    //Se mete en el array antes de guardar los cambios
    area.members.push(member);

    //Guardamos los cambios del area
    var saved_area = await area.save();

    //Y devolvemos la respuesta
    ResponseController.getResponse(res, 200, true, `Área modificada con éxito, se generó un nuevo miembro en '${area.name}'`, null, saved_area);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};


module.exports = areaController;