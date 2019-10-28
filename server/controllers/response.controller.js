const responseController = {};

// ==================================================
// Get response
// ==================================================
responseController.getResponse = async (res, status, ok, message, error, data) => {
  return res.status(status).json({
    ok: ok,
    status: status,
    message: message,
    error: error,
    data: data
  });
};

module.exports = responseController;
