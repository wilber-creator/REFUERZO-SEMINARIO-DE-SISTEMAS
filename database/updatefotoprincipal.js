var mongoose = require("./connect");
var updatefotoprincipalSchema = new mongoose.Schema({
    fotoprincipal: {
        type: String,
        required: [true, "la ruta de la foto principal es necesaria"]
    },
    relativepath: {
        type: String
    },
    
    hash: {
        type: String,
        required: [true, "la ruta de la foto principal es necesaria"]
    }
});
var UPDATEFOTOPRINCIPAL = mongoose.model("updatefotoprincipal", updatefotoprincipalSchema);
module.exports = UPDATEFOTOPRINCIPAL;
