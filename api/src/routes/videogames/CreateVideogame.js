const server = require('express').Router();
const { Videogame, Genre, Op } = require('../../db');
const axios = require('axios');

server.post("/add", function(req, res, next){
    const { name, image, released, rating, description, platforms, genre} = req.body;
    if(!name || !image || !released || !rating || !description || !platforms || !genre ){
        return res.status(422).json({error: "No se enviaron todos los datos"})
    }
    Videogame.create({
        name: name,
        image: image,
        released: released, 
        rating: rating,
        description: description,
        platforms: platforms,
    })
    .then(videogame => {
        videogame.addGenres(genre)
        .then(async ()=>{
            videogame.genre = await videogame.getGenres()  
            res.json({
                name: videogame.name,
                image: videogame.image,
                released: videogame.released,
                rating: videogame.rating,
                description: videogame.description,
                platforms: videogame.platforms,
                genres: videogame.genre
            })
        }) 
    }).catch((error) => {
        next(error)
    }) 
}) 
module.exports = server;