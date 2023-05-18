const axios = require("axios");
const express=require("express")
const {Pokemon, Type} = require("../db");


const getAllPokemons= async (req, res)=>{
    try {
        //get url donde estan todos los pokes
        const response=await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');
        //saca la lista de los poke
        const pokemons=response.data.results;
        //promise.all para que se ejecuten las promesas todo al mismo tiempo
        const pokeData=await Promise.all(pokemons.map(async(pokemon)=>{
            //sacar url individual de cada poke para buscar sus caracteristicas
            const indURL=await axios.get(pokemon.url);
            return({
                pokemonId:indURL.data?.id,
                name:indURL.data?.name,
                hp:indURL.data.stats[0]?.base_stat,
                attack: indURL.data.stats[1]?.base_stat,
                defense:indURL.data.stats[2]?.base_stat,
                speed:indURL.data.stats[5]?.base_stat,
                height:indURL.data?.height,
                weight:indURL.data?.weight,
                types:indURL.data.types?.map((t)=>t.type.name).join(" & "),
                image:indURL.data.sprites?.front_default,
            })
            
        }))
        return pokeData
    
    } catch (error) {
        console.error(error)
    }
}

const getPokemonById = async(pokemonId)=>{
    try {
    //primero buscar id en BDD
    const pokeDB=await Pokemon.findByPk(pokemonId)
        if(pokeDB){
            return pokeDB
        }
        //sino esta en la BDD buscar en la API
        else {
        const res=await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon={
            pokemonId:res.data?.id,
            name:res.data?.name,
            hp:res.data.stats[0]?.base_stat,
            attack:res.data.stats[1]?.base_stat,
            defense:res.data.stats[2]?.base_stat,
            speed:res.data.stats[5]?.base_stat,
            height:res.data?.height,
            weight:res.data?.weight,
            types:res.data.types?.map((t)=>t.type.name).join(" & "),
            image:  res.data.sprites.versions['generation-v']['black-white'].animated?.front_default,
        }
        return pokemon
    }
    
    } catch (error) {
        console.error(error)
    }
    
}

const getPokemonByName = async (name)=>{
    try {
        //buscar si se encuentra el nombre en la bas de datos
        const nameDB=await Pokemon.findOne(
            {where:{ name }}
        )
        //si está lo devulve
        if(nameDB){
            return nameDB
        }
        //sino hace la petición del nombre a la api y devuelve el poke
        else{
            const res=await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemon={
                id:res.data.id,
                name:res.data.name,
                life:res.data.stats[0].base_stat,
                attack:res.data.stats[1].base_stat,
                defense:res.data.stats[2].base_stat,
                speed:res.data.stats[5].base_stat,
                height:res.data.height,
                weight:res.data.weight,
                types:res.data.types.map((t)=>t.type.name).join(" & "),
                image:res.data.sprites.front_default,
            }
            return pokemon
        }   

    } catch (error) {
        console.error(error)
    }
}


//fun para traer los poke de la BDD
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model:Type, 
            as: "pokemonTypes",
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

//juntar poke de la api y de la BDD para tenerlos en un solo obj
 const getAllInfo = async () => {
    const apiData = await getAllPokemons();
    const dbInfo = await getDbInfo();
    const allInfo = apiData.concat(dbInfo);
    console.log(allInfo)
    return allInfo;
};

module.exports={
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    getAllInfo
}