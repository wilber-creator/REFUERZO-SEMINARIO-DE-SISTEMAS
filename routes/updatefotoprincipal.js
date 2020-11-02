var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var fileupload = require('express-fileupload')
var UPDATEFOTOPRINCIPAL = require("../database/updatefotoprincipal");
router.use(fileupload({
    fileSize: 50 * 1024 * 1024
}));

router.post("/sendfile2", (req, res) => {
    var imagen = req.files.fotoprincipal;
    var path = __dirname.replace(/\/routes/g, "/fotoprincipal");
    var date = new Date();
    var sing  = sha1(date.toString()).substr(1, 5);
    var totalpath = path + "/" + sing + "_" + imagen.name.replace(/\s/g,"_");
    imagen.mv(totalpath, async(err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        console.log(imagen);
        obj["fotoprincipal"] = totalpath;
        obj["hash"] = sha1(totalpath);
        obj["relativepath"] = "/v1.0/api/getfile2/?id=" + obj["hash"];
        var updatefotoprincipal = new UPDATEFOTOPRINCIPAL(obj);
        updatefotoprincipal.save((err, docs) => {
            if (err) {
                res.status(500).json({msn: "ERROR "})
                return;
            }
            res.status(200).json({msn: "FOTO PRINCIPAL REGISTRADA EXITOSAMENTE"}); 
        });
    });
 });

router.get('/getupdatefotoprincipal', (req, res, next) => {
  UPDATEFOTOPRINCIPAL.find({}, (err, docs) => {
    res.status(200).json(docs);
  });
});

router.get("/getfile2", async(req, res, next) => {
    var params = req.query;
    if (params == null) {
        res.status(300).json({ msn: "Error es necesario un ID"});
        return;
    }
    var id = params.id;
    var updatefotoprincipal =  await UPDATEFOTOPRINCIPAL.find({hash: id});
    if (updatefotoprincipal.length > 0) {
        var path = updatefotoprincipal[0].fotoprincipal;
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
    UPDATEFOTOPRINCIPAL.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});
module.exports = router;
