const areaController = {};
const Area = require("../models/area");
const Organization = require("../models/organization");

// ==================================================
// Get all areas
// ==================================================
areaController.getAreas = async (req, res) => {
  try {
    await Area.find()
      .populate("organization")
      .populate("created_by")
      .populate({
        path: "members.user",
        model: "User"
      })
      .then(areas => {
        res.status(200).json({
          ok: true,
          data: areas
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al consultar todas las areas",
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
// Get an area
// ==================================================
areaController.getArea = async (req, res) => {
  try {
    var areaId = req.params.id;

    var area = await Area.findById(areaId)
      .populate("organization")
      .populate("created_by")
      .populate({
        path: "members.user",
        model: "User"
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al consultar todas las areas",
          error: error
        });
      });

    if (!area) {
      return res.status(404).json({
        ok: false,
        message:
          "El area con id " + areaId + " no se encuentra en la base de datos"
      });
    }

    res.status(200).json({
      ok: true,
      data: area
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

    await area
      .save()
      .then(area => {
        res.status(200).json({
          ok: true,
          data: area
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al guardar el area",
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
// Update an area
// ==================================================
areaController.updateArea = async (req, res) => {
  try {
    var areaId = req.params.id;
    var body = req.body;
    var area = await Area.findById(areaId);

    if (!area) {
      return res.status(404).json({
        ok: false,
        message:
          "El area con id " + areaId + " no se encuentra en la base de datos"
      });
    }

    area.name = body.name;

    await area
      .save()
      .then(area => {
        res.status(200).json({
          ok: true,
          data: area
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al actualizar el area",
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
// Delete an area
// ==================================================
areaController.deleteArea = async (req, res) => {
  res.json("Delete a area");
};

// ==================================================
// Create members area
// ==================================================
areaController.createAreaMember = async (req, res) => {
  try {
    var areaId = req.params.area;
    var body = req.body;

    await Area.findById(areaId)
      .then(area => {
        var member = {
          user: body.user,
          role: body.role
        };

        area.members.push(member);

        area.save();

        //sent respnse to client
        res.status(200).json({
          ok: true,
          data: area
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al actualizar el area",
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
// Update members area
// ==================================================

areaController.updateAreaMember = async (req, res) => {
  try {
    var areaId = req.params.area;
    var memberId = req.params.member;
    var body = req.body;

    var area = await Area.findById(areaId);

    if (!area) {
      return res.status(404).json({
        ok: false,
        message: "No existe el area con el id " + areaId
      });
    }

    var member = area.members.id(memberId);

    if (!member) {
      return res.status(404).json({
        ok: false,
        message: "No existe el miembro con el id " + memberId
      });
    }

    member["role"] = body.role;
    member["updated_at"] = new Date();

    await area
      .save()
      .then(area => {
        //sent respnse to client
        res.status(200).json({
          ok: true,
          data: area
        });
      })
      .catch(error => {
        res.status(400).json({
          ok: false,
          message: "Error al actualizar el area",
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

module.exports = areaController;
