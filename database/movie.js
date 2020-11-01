const mongoose = require("./connect");
var MOVIESCHEMA = {
    titulo      :String,
    descripcion :String,
    sinopsis    :String,
    idioma      :String,
    rating      :String,
    
}

const MOVIE= mongoose.model("movie", MOVIESCHEMA);
module.exports = {model: MOVIE, schema:MOVIESCHEMA};
