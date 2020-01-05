const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/images.controller');
const { verifyToken } = require('../middlewares/authentication');

// ==================================================
// Obtener imagenes
// ==================================================
router.get('/images/:img', imagesController.getImage);

// ==================================================
// Subir archivos al server
// ==================================================
router.put('/images/upload/:id', verifyToken, imagesController.uploadFile);

module.exports = router;