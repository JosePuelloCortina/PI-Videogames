const server = require('express').Router();
const { Genre } = require('../db');

server.get("/", async function(req, res, next){
    try{
        res.status(200).json(await Genre.findAll())
    }catch(error){
        next(error)
    }
})
 
module.exports = server;