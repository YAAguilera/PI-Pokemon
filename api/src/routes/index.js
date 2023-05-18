const { Router } = require('express');
const router = Router();
const pokemonsRoute=require("../routes/pokemonsRoute")
const typesRoute=require("../routes/typesRoute")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRoute)
router.use("/types", typesRoute)

module.exports = router;
