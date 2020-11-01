var express = require('express');
var router = express.Router();

const movie = require('../database/movie');
const MOVIE = movie.model;
const MOVIESCHEMA = movie.schema;
//POST
router.post('/movie', async(req, res) => {
    console.log(req.body);
    var params = req.body;
    params["registerdate"] = new Date();
    var movies = new MOVIE(params);
    var result = await movies.save();
    res.status(200).json(result);
});

//GET
router.get("/movie", (req, res) => {
    var params = req.query;
    console.log(params);
    var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
        if (params.order == "desc") {
            order = -1;
        } else if (params.order == "asc") {
            order = 1;
        }
    }
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    MOVIE.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
});

//PATCH
router.patch("/movie", (req, res) =>{
    if(req.query.id == null){
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    MOVIE.findOneAndUpdate({_id: id}, params,(err, docs)=>{
        res.status(200).json(docs);
    });
});

//DELETE
router.delete("/movie", async(req, res)=>{
    if(req.query.id == null){
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var r = await MOVIE.remove({_id: req.query.id});
    res.status(300).json(r);
});

module.exports=router;
