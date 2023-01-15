const server = require('express').Router();
const { Videogame, Genre} = require('../../db');
const axios = require('axios');

server.get("/", async function(req, res, next){
    try {
        let apiGames = [];
        for(i=1; i <= 5; i++){
            let response = await axios.get(`https://api.rawg.io/api/games?key=216850b07c7249198b54ada2f2630d03&page=${i}`);
            response = response.data.results.map( v => {                      
                const result =  {
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    released: v.released,
                    rating: v.rating,
                    platforms: v.platforms.map(e => e.platform.slug),
                    genres: v.genres
                }  
                apiGames.push(result)  
            })  
        }
        Videogame.findAll({include: {model: Genre}})
        .then( dbVideogame =>{
            dbVideogame = dbVideogame.concat(apiGames)
            res.status(200).json(dbVideogame)
        })    
    } catch (error) {
        console.log(error)        
    } 
})

module.exports = server;