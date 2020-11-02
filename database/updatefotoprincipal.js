var mongoose = require("./connect");
var updatefotoprincipalSchema = new mongoose.Schema({
    foto1: {
        type: String,
        required: [true, "la ruta de la foto principal es necesaria"]
    },
    relativepath: {
        type: String
    },
    
    hash1: {
        type: String,
        required: [true, "la ruta de la foto principal es necesaria"]
    }
});
var UPDATEFOTOPRINCIPAL = mongoose.model("updatefotoprincipal", updatefotoprincipalSchema);
module.exports = UPDATEFOTOPRINCIPAL;
