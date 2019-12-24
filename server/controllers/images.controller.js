const imagesController = {};
const fs = require('fs');
const User = require('../models/user');
const path = require('path');
const ResponseController = require('./response.controller');

// ==================================================
// Obtener imagenes
// ==================================================
imagesController.getImage = (req, res) => {

  try {

    var img = req.params.img;

    var pathImage = path.resolve(__dirname, `../uploads/${img}`);

    if (fs.existsSync(pathImage)) {
      res.sendFile(pathImage);
    } else {
      var pathNoImgae = path.resolve(__dirname, `../assets/images/no-img.jpg`);
      res.sendFile(pathNoImgae);

    }

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error al subir el archivo',
      errors: error
    });
  }
}

// ==================================================
// Subir archivos al server
// ==================================================
imagesController.uploadFile = async (req, res) => {
  try {

    var id = req.params.id;

    if (!req.files) throw new Error('Debe seleccionar un archivo');

    //Obtener nombre del archivo
    var archivo = req.files.imagen;
    let archivoSplit = archivo.name.split('.');
    let extension = archivoSplit[archivoSplit.length - 1];

    //Validacion de extensiones
    let extensionesValidas = ['png', 'jpg', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) throw new Error('La extensión del archivo es invalida')


    //Nombre de archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    //Mover el archivo del temporal a un path especifico

    await uploadImage(id, User, archivo, nombreArchivo, res);

  } catch (error) {
    console.log(error);
    ResponseController.getResponse(res, 500, false, 'Error de servidor', error.message, null);
  }
};

async function uploadImage(id, model, archivo, nombreArchivo, res) {

  try {
    var data = await model.findById(id, '-password');

    if (!data) throw new Error('No existen usuarios con ese ID');


    var pathViejo = path.resolve(__dirname, `../uploads/${data.img}`);

    //Si existe, elimina el path viejo del usuario
    if (fs.existsSync(pathViejo)) {
      fs.unlinkSync(pathViejo);
    }

    data.img = nombreArchivo;

    var dataSaved = await data.save();

    //Movemos la imagen al folder del server
    var imgPath = path.resolve(__dirname, `../uploads/${nombreArchivo}`);
    await archivo.mv(imgPath);

    ResponseController.getResponse(res, 200, true, "La búsqueda fue un éxito", null, dataSaved);

  } catch (error) {
    ResponseController.getResponse(res, 500, false, "Error de servidor", error.message, null);
  }

}

module.exports = imagesController;