var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var fileupload = require('express-fileupload')
var UPDATEFOTOPRINCIPAL = require("../database/updatefotoprincipal");
router.use(fileupload({
    fileSize: 50 * 1024 * 1024
}));

router.post("/sendfilee", (req, res) => {
    var imagen = req.files.foto1;
    var path = __dirname.replace(/\/routes/g, "/FotoPrincipal");
    var date = new Date();
    var sing  = sha1(date.toString()).substr(1, 5);
    var totalpath = path + "/" + sing + "_" + imagen.name.replace(/\s/g,"_");
    imagen.mv(totalpath, async(err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        obj["foto1"] = totalpath;
        obj["hash1"] = sha1(totalpath);
        obj["relativepath"] = "/v1.0/api/getfilefotoprincipal/?id=" + obj["hash"];
        var updatefotoprincipal = new UPDATEFOTOPRICIPAL(obj);
        updatefotoprincipal.save((err, docs) => {
            if (err) {
                res.status(500).json({msn: "ERROR "})
                return;
            }
            res.status(200).json({msn: "PORTADA REGISTRADA EXITOSAMENTE"}); 
        });
    });
 });

router.get('/getupdatefotoprincipal', (req, res, next) => {
  UPDATEFOTOPRINCIPAL.find({}, (err, docs) => {
    res.status(200).json(docs);
  });
});

router.get("/getfilefotoprincipal", async(req, res, next) => {
    var params = req.query;
    if (params == null) {
        res.status(300).json({ msn: "Error es necesario un ID"});
        return;
    }
    var id = params.id;
    var updateportada =  await UPDATEPORTADAS.find({hash1: id});
    if (updateportada.length > 0) {
        var path = updateportada[0].foto1;
        res.sendFile(path);
        return;
    }
    res.status(300).json({
        msn: "Error en la petición"
    });
    return;
});
router.delete("/deletefotoprincipal", (req, res) => {
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    UPDATEPORTADAS.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});
module.exports = router;
