const server = require('express').Router();
const { Videogame, Genre } = require('../db');
const axios = require('axios');

server.get("/", async function(req, res, next){
    try {
        const response = await axios.get('https://api.rawg.io/api/games?key=216850b07c7249198b54ada2f2630d03');

        response = response.data.results.forEach(v => {
            let apiDes = axios.get(`https://api.rawg.io/api/games/${v.id}?key=216850b07c7249198b54ada2f2630d03`)
            const result = {
                name: v.name,
                description: apiDes.data.description,
                image: v.imagen,
                released: v.released,
                rating: v.rating,
                platforms
            }
            return result;
        })
        
    } catch (error) {
        console.log(error)        
    }
})