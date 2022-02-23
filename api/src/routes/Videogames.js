const server = require('express').Router();
const { Videogame, Genre, Op } = require('../db');
const axios = require('axios');



server.get("/", async function(req, res, next){
    try {
        let response = await axios.get('https://api.rawg.io/api/games?key=216850b07c7249198b54ada2f2630d03&page_size=40');
        
        response = response.data.results.map( v => {                      
            return {
                id: v.id,
                name: v.name,
                image: v.background_image,
                released: v.released,
                rating: v.rating,
                platforms: v.platforms.map(e => e.platform.slug),
                genres: v.genres.map(g => g.slug)
            }    
        })
        Videogame.findAll({include: {model: Genre}})
        .then( dbVideogame =>{

            dbVideogame = dbVideogame.concat(response)
            res.status(200).json(dbVideogame)

        })    
    } catch (error) {
        console.log(error)        
    } 
})

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
        }
        res.send(videogame ? videogame : "No hay videogame!!")
    } catch (error) {
        console.log(error) 
        
    }
})

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
        axios.get(`https://api.rawg.io/api/games?search=${name}&key=216850b07c7249198b54ada2f2630d03`)
        .then((res) =>{
            result = result.concat(res.data)
            return res.json(result)
        }).catch(() =>{
            return res.json(result)
        })
        
        
    } catch (error) {
        console.log(error)
        
    }
})
server.post("/add", function(req, res, next){
    const { name, image, released, rating, description, platforms, genre} = req.body;
    if(!name || !image || !released || !rating || !description || !platforms ){
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
            })
        }) 
    }).catch((error) => {
        next(error)
    })
})
module.exports = server;