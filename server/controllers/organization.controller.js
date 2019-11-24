const organizationController = {};
const Organization = require("../models/organization");
const Area = require("../models/area");
const Member = require("../models/member");
const ResponseController = require('./response.controller');

// ==================================================
// Get all organizations
// ==================================================
organizationController.getOrganizations = async (req, res) => {
  try {
    var organizations = await Organization.find();

    // if (!organizations) return ResponseController.getResponse(res, 404, false, "No existen organizaciones en la base de datos", "Error al buscar las organizaciones", null);

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
    var organization_id = req.params.organization;

    var organization = await Organization.findById(organization_id)
      .populate({
        path: 'created_by',
        model: 'User',
        select: '-password'
      });

    if (!organization) return ResponseController.getResponse(res, 404, false, `No existe la organización con id '${organization_id}' en la base de datos`, "Error al buscar la organización", null);

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

    var savedOrganization = await Organization.create({
      name: body.name,
      created_by: body.user
    });

    var organization = await Organization.findById(savedOrganization._id);

    ResponseController.getResponse(res, 200, true, `La organización '${organization.name}' se creó con éxito`, null, organization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Update an organization
// ==================================================
organizationController.updateOrganization = async (req, res) => {
  try {
    var organization_id = req.params.organization;
    var body = req.body;

    var organization = await Organization.findById(organization_id);

    if (body.name) {
      organization.name = body.name;
      organization.updated_at = new Date();
    };

    if(body.deleted_at){
      organization.deleted_at = undefined;
    }

    var savedOrganization = await organization.save();

    ResponseController.getResponse(res, 200, true, `La organización '${savedOrganization.name}' se actualizó con éxito`, null, savedOrganization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Delete an organization
// ==================================================
organizationController.deleteOrganization = async (req, res) => {
  try {
    var organization_id = req.params.organization;

    var organization = await Organization.findById(organization_id);


    organization.deleted_at = new Date();

    var savedOrganization = await organization.save();

    ResponseController.getResponse(res, 200, true, `La organización '${savedOrganization.name}' fue dada de baja con éxito`, null, savedOrganization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Get all organization`s areas
// ==================================================
organizationController.getOrganizationAreas = async (req, res) => {
  try {
    var organization_id = req.params.organization;

    var areas = await Area.find({
      organization: organization_id
    });


    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, areas);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

// ==================================================
// Get all organization`s areas
// ==================================================
organizationController.getOrganizationMembers = async (req, res) => {
  try {
    var organization_id = req.params.organization;

    var members = await Member.find({
      organization: organization_id
    });

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, members);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error, null);
  }
};

module.exports = organizationController;