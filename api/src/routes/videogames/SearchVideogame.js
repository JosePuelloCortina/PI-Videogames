const server = require('express').Router();
const { Videogame, Genre, Op } = require('../../db');
const axios = require('axios');


server.get("/search", async function(req, res, next){
    try {
            const { name } = req.query;
            let result = [];
            let dbVideogame = await Videogame.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: {model: Genre}
            })
            if(dbVideogame && dbVideogame.length) result = result.concat(dbVideogame)
            let searchVg = [];
            let response = await axios.get(`https://api.rawg.io/api/games?key=216850b07c7249198b54ada2f2630d03&search=${name}`)
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
                searchVg.push(result)  
            }) 
            let all = result.concat(searchVg)
            res.send(all)
    } catch (error) {
        console.log(error)
        
    }
})

module.exports = server;