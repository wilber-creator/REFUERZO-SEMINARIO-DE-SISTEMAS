const mongoose = require('mongoose');
mongoose.connect("mongodb://172.26.0.2:27017/crud");
module.exports=mongoose;
