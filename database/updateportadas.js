var mongoose = require("./connect");
var updateportadasSchema = new mongoose.Schema({
    foto: {
        type: String,
        required: [true, "la ruta de la portada es necesaria"]
    },
    relativepath: {
        type: String
    },
    
    hash: {
        type: String,
        required: [true, "la ruta de la portada es necesaria"]
    }
});
var UPDATEPORTADAS = mongoose.model("updateportadas", updateportadasSchema);
module.exports = UPDATEPORTADAS;
