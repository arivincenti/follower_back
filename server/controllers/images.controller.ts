import fs from "fs";
import User from "../models/user";
import path from "path";
import { Response, Request } from "express";
import { getResponse } from "./response.controller";

// ==================================================
// Obtener imagenes
// ==================================================
export const getImage = (req: Request, res: Response) => {
    try {
        var img = req.params.img;
        var pathImage = path.resolve(__dirname, `../uploads/${img}`);

        if (fs.existsSync(pathImage)) {
            res.sendFile(pathImage);
        } else {
            var pathNoImgae = path.resolve(
                __dirname,
                `../assets/images/no-img.jpg`
            );
            res.sendFile(pathNoImgae);
        }
    } catch (error) {
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
export const uploadFile = async (req: Request, res: Response) => {
    try {
        var id = req.params.id;

        if (!req.files) throw new Error("Debe seleccionar un archivo");

        //Obtener nombre del archivo
        var archivo: any = req.files.imagen;
        let archivoSplit = archivo.name.split(".");
        let extension = archivoSplit[archivoSplit.length - 1];

        //Validacion de extensiones
        let extensionesValidas = ["png", "jpg", "jpeg"];

        if (extensionesValidas.indexOf(extension) < 0)
            throw new Error("La extensión del archivo es invalida");

        //Nombre de archivo personalizado
        var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

        //Mover el archivo del temporal a un path especifico

        await uploadImage(id, User, archivo, nombreArchivo, res);
    } catch (error) {
        console.log(error);
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
};

async function uploadImage(
    id: string,
    model: any,
    archivo: any,
    nombreArchivo: string,
    res: Response
) {
    try {
        var data = await model.findById(id, "-password");

        if (!data) throw new Error("No existen usuarios con ese ID");

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

        getResponse(res, 200, true, "", "La búsqueda fue un éxito", dataSaved);
    } catch (error) {
        getResponse(res, 500, false, "Error de servidor", error.message, null);
    }
}
