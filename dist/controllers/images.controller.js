"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const response_controller_1 = require("./response.controller");
// ==================================================
// Obtener imagenes
// ==================================================
exports.getImage = (req, res) => {
    try {
        var img = req.params.img;
        var pathImage = path_1.default.resolve(__dirname, `../uploads/${img}`);
        if (fs_1.default.existsSync(pathImage)) {
            res.sendFile(pathImage);
        }
        else {
            var pathNoImgae = path_1.default.resolve(__dirname, `../assets/images/no-img.jpg`);
            res.sendFile(pathNoImgae);
        }
    }
    catch (error) {
        res.json({
            ok: false,
            message: "Error al subir el archivo",
            errors: error
        });
    }
};
// ==================================================
// Subir archivos al server
// ==================================================
exports.uploadFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        if (!req.files)
            throw new Error("Debe seleccionar un archivo");
        //Obtener nombre del archivo
        var archivo = req.files.imagen;
        let archivoSplit = archivo.name.split(".");
        let extension = archivoSplit[archivoSplit.length - 1];
        //Validacion de extensiones
        let extensionesValidas = ["png", "jpg", "jpeg"];
        if (extensionesValidas.indexOf(extension) < 0)
            throw new Error("La extensión del archivo es invalida");
        //Nombre de archivo personalizado
        var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
        //Mover el archivo del temporal a un path especifico
        yield uploadImage(id, user_1.default, archivo, nombreArchivo, res);
    }
    catch (error) {
        console.log(error);
        response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
});
function uploadImage(id, model, archivo, nombreArchivo, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var data = yield model.findById(id, "-password");
            if (!data)
                throw new Error("No existen usuarios con ese ID");
            var pathViejo = path_1.default.resolve(__dirname, `../uploads/${data.img}`);
            //Si existe, elimina el path viejo del usuario
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlinkSync(pathViejo);
            }
            data.img = nombreArchivo;
            var dataSaved = yield data.save();
            //Movemos la imagen al folder del server
            var imgPath = path_1.default.resolve(__dirname, `../uploads/${nombreArchivo}`);
            yield archivo.mv(imgPath);
            response_controller_1.getResponse(res, 200, true, "", "La búsqueda fue un éxito", dataSaved);
        }
        catch (error) {
            response_controller_1.getResponse(res, 500, false, "Error de servidor", error.message, null);
        }
    });
}
