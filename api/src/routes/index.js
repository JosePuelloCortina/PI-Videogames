const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogame = require('./Videogames');
const genre = require('./Genres');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogame);
router.use("/genres", genre);


module.exports = router;
