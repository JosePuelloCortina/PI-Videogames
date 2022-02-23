const { Genre } = require('../db'); 
//const {v4: uuidv4 } = require('uuid');
const axios = require('axios');

const initializeGenre = async() =>{
    try {
        let response = await axios.get('https://api.rawg.io/api/genres?key=216850b07c7249198b54ada2f2630d03');

        response = response.data.results.forEach( async g =>{
            const result={
                
                name: g.slug
            }
            const createGenre = await Genre.create(result)
            await createGenre;
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = initializeGenre;