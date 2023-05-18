const {Router}=require ("express")
const router=Router()
const axios=require("axios")
const { getPokemonById, getPokemonByName, getAllInfo}=require("../Controllers/pokemonCont")
const {Pokemon} = require("../db")
const { where } = require("sequelize")


//get all Pokemons
router.get("/", async(req, res)=>{
    try {
        const allpoke=await getAllInfo()
        console.log(allpoke)
        return res.status(200).send(allpoke)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }  
})

//get pokemon by id
router.get("/:id", async(req, res)=>{
    try {
        const pokeId=req.params.id
        const pokemon=await getPokemonById(pokeId)
        if(!pokemon){
            res.status(400).json("Pokemon not found")
        }
        res.status(200).send(pokemon)
    } catch (error) {
        console.error(error)
        res.status(500).send("internal server error")
    }
})

//get pokemon by name
router.get("/name/:name", async(req, res) => {
    try {
      const pokename = req.params.name;
      const pokemon = await getPokemonByName(pokename);
  
      if (!pokemon) {
        res.status(404).send("Pokemon not found in back");
      }
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

//create pokemon
router.post("/", async(req, res)=>{
    try {
        const {name, hp, attack, defense, speed, height, weight, image, types}=req.body

        // Verificar que se reciben los campos requeridos
        if (!name || !hp || !attack || !defense || !speed) {
            return res.status(400).send('Missing required fields');
        }

        //buscar si el poke existe en la BDD
        const existingPokemon = await Pokemon.findOne({ where: { name } });
        //si existe en la BDD
        if (existingPokemon) {
            return res.status(409).send('This pokemon already exists');
        }

        //devuelve los poke que están en la BDD
        const response=await axios.get("http://localhost:3001/pokemons")
        //se obtiene el pokemonId del último Pokémon en la respuesta y se incrementa en uno para asignar un nuevo pokemonId al nuevo Pokémon.
        let lastPokemonId = response.data[response.data.length - 1].pokemonId;
        const id = lastPokemonId + 1;

        // const oldPokemonLink = await axios.get(`http://localhost:3001/pokemons/name/${name}`)
        // if(oldPokemonLink){res.status(400).send("The pokemon that you are creating already exists")}

        //sino, crear un nuevo poke
        const pokemon= await Pokemon.create({
            pokemonId: id,
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types,
            image
        });

        if (!pokemon) {
            return res.send({ message: "Not created" });
        }

        return res.status(201).send("Pokemon created succesfully");

        

    } catch (error) {
        console.error(error)
        res.status(404).send("error de back")
    }
})

router.delete("/:id", async (req,res)=>{
  try {
      const pokemonId=req.params.id
      //se eleimina el poke de la BDD
      const deletedPokemon= await Pokemon.destroy({
        where:{
          pokemonId:  pokemonId
        }
      })
      //sino se encuentra el poke con ese id
      if(!deletedPokemon){
        return res.status(404).send("Error al encontrar el pokemon")
      }
      //si se encuentra
      return res.status(200).send(`El pokemon ${pokemonId} se elimino con exito`)
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("internal server error")
  }
}) 


module.exports=router