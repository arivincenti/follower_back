const organizationController = {};
const Organization = require("../models/organization");

// ==================================================
// Get all organizations
// ==================================================
organizationController.getOrganizations = async (req, res) => {
  try {
    await Organization.find()
      .populate("created_by")
      .then(organizations => {
        res.json({
          ok: true,
          data: organizations
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al consultar las organizaciones",
          error: error
        });
      });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error de servidor",
      error: error
    });
  }
};

// ==================================================
// Get an organization
// ==================================================
organizationController.getOrganization = async (req, res) => {
  res.json("Get one organization");
};

// ==================================================
// Create an organization
// ==================================================
organizationController.createOrganization = async (req, res) => {
  try {
    var body = req.body;

    organization = new Organization({
      name: body.name,
      created_by: body.user
    });

    await organization
      .save()
      .then(organization => {
        res.status(200).json({
          ok: true,
          message: "Organization created",
          data: organization
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al crear la organización",
          error: error
        });
      });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error de servidor",
      error: error
    });
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

module.exports = organizationController;
