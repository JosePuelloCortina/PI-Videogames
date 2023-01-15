const server = require('express').Router();
const { Videogame, Genre} = require('../../db');
const axios = require('axios');



server.get("/id/:id", async function(req, res, next){
    try {
        const { id } = req.params;
        let videogame; 
        if(isNaN(id)){
            videogame = await Videogame.findOne({
                where:{
                    id:id
                }, include: {
                    model: Genre
                }
            })
        }else{
            videogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=216850b07c7249198b54ada2f2630d03`)).data
            const r = {
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                description: videogame.description,
                released: videogame.released,
                rating: videogame.rating,
                platforms: videogame.platforms.map(e => e.platform.slug),
                genres: videogame.genres
            }
            videogame = r;
        }
        res.send(videogame ? videogame : "No hay videogame!!")
    } catch (error) {
        console.log(error) 
        
    }
})

module.exports = server;