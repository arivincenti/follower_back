const responseController = {};

// ==================================================
// Get response
// ==================================================
responseController.getResponse = async (res, status, ok, error, message, data) => {
  return res.status(status).json({
    ok: ok,
    status: status,
    message: message,
    error: error,
    data: data
  });
};

module.exports = responseController;