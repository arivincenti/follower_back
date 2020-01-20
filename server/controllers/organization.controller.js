const organizationController = {};
const Organization = require("../models/organization");
const Member = require("../models/member");
const ResponseController = require('./response.controller');
const EmailController = require('./email.controller');
const {
  mailjet
} = require('../config/config');

// ==================================================
// Get all organizations
// ==================================================
organizationController.getOrganizations = async (req, res) => {

  try {
    //ID del usuario recibido por URL
    var user_id = req.params.user;

    // Busca los ID de las organizaciones en las que el usuario es miembro de algun Área
    // y trae valores únicos en caso de que vengan repetidas
    var userIsMember = await Member.find({
      user: user_id
    }).distinct('organization');

    //Busca las organizaciones en base a dos condiciones
    //1) El usuario puede ser dueño de la organización sin ser usuario
    //2) El usuario puede no ser dueño, pero si ser miembro, en este caso la organización a la que pertenece vendria en la variable 'userIsMember'
    var userOrganizations = await Organization.find({
      $or: [{
        'created_by': user_id
      }, {
        '_id': {
          $in: userIsMember
        }
      }]
    })
    .populate({
      path: 'created_by',
      model: 'User',
      select: '-pasword'
    });;

    //Devolvemos la colección  n de organizaciones en las que esta involucrado el usuario
    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", userOrganizations);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
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

    if (!organization) throw new Error('No se encontró la organización');

    ResponseController.getResponse(res, 200, true, null, "La búsqueda fue un éxito", organization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
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

    var organization = await Organization.findById(savedOrganization._id)
      .populate({
        path: 'created_by',
        model: 'User',
        select: '-pasword'
      });

    // var email = `${organization.created_by.email}`;
    // var name = `${organization.created_by.name} ${organization.created_by.last_name}`;
    // var subject = `Tu organización se creó con éxito`;
    // var textPart = `Genial! Creaste a ${organization.name}, buen nombre para tu organización.`;

    // EmailController.sendEmail(email, name, subject, textPart, '');

    ResponseController.getResponse(res, 200, true, null, `La organización '${organization.name}' se creó con éxito`, organization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
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

    if (body.deleted_at) {
      organization.deleted_at = undefined;
    }

    var savedOrganization = await organization.save();

    ResponseController.getResponse(res, 200, true, null, `La organización '${savedOrganization.name}' se actualizó con éxito`, savedOrganization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
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

    ResponseController.getResponse(res, 200, true, null, `La organización '${savedOrganization.name}' fue dada de baja con éxito`, savedOrganization);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }
};

module.exports = organizationController;