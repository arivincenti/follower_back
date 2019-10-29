const organizationController = {};
const Organization = require("../models/organization");
const Area = require("../models/area");
const ResponseController = require('./response.controller');

// ==================================================
// Get all organizations
// ==================================================
organizationController.getOrganizations = async (req, res) => {
  try {
    var organizations = await Organization.find()
      .populate({
        path: "created_by",
        model: "User",
        select: '-password'
      });

    if (!organizations) ResponseController.getResponse(res, 404, false, "No existen organizaciones en la base de datos", "Error al buscar las organizaciones", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, organizations);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Get an organization
// ==================================================
organizationController.getOrganization = async (req, res) => {
  try {
    var organization_id = req.body.organization;
    var organization = await Organization.find(organization_id)
      .populate({
        path: "created_by",
        model: "User",
        select: '-password'
      });

    if (!organization) ResponseController.getResponse(res, 404, false, "No existe la organización con id " + organization_id + " en la base de datos", "Error al buscar la organización", null);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, organization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Create an organization
// ==================================================
organizationController.createOrganization = async (req, res) => {
  try {
    var body = req.body;

    var organization = new Organization({
      name: body.name,
      created_by: body.user
    });

    var savedOrganization = await organization.save();

    ResponseController.getResponse(res, 200, true, "La organización '" + savedOrganization.name + "' se creó con éxito", null, savedOrganization);
  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Update an organization
// ==================================================
organizationController.updateOrganization = async (req, res) => {
  res.json("Update a organization");
};

// ==================================================
// Delete an organization
// ==================================================
organizationController.deleteOrganization = async (req, res) => {
  res.json("Delete a organization");
};

// ==================================================
// Get all organization`s areas
// ==================================================
organizationController.getOrganizationAreas = async (req, res) => {
  try {
    var organizationId = req.params.organization;

    var areas = await Area.find({
        organization: organizationId
      })
      .populate({
        path: "created_by",
        model: "User",
        select: '-password'
      })
      .populate({
        path: "members.user",
        model: "User",
        select: '-password'
      });

    if (!areas) {
      ResponseController.getResponse(res, 404, false, "No existen áreas en la base de datos relacionadas a la organización con id '" + organizationId + "'", "No se encontraron datos", null);
    }

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, areas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

module.exports = organizationController;