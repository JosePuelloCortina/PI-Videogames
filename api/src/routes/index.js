const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const AllGenres = require('./genres/AllGenres')

const AllVideogames = require('./videogames/AllVideogames')
const VideogameId = require('./videogames/VideogameId')
const SearchVideogame = require('./videogames/SearchVideogame')
const CreateVideogame = require('./videogames/CreateVideogame')

const router = Router(); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", AllGenres);

router.use("/videogames", AllVideogames);
router.use("/videogames", VideogameId);
router.use("/videogames", SearchVideogame);
router.use("/videogames", CreateVideogame)

module.exports = router;
