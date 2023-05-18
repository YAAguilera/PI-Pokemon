import axios from 'axios'
export const GET_ALL_POKE="GET_ALL_POKE"
export const GET_POKEMON="GET_POKEMON"
export const CLEAR_POKEMON="CLEAR_POKEMON"
export const GET_NAME="GET_NAME"
export const CLEAR_SEARCH="CLEAR_SEARCH"
export const GET_TYPES="GET_TYPES"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER="ORDER"
export const DAMAGE="DAMAGE"

export const getAllPokemon = () => {
    return async function (dispatch) {
      //hace una petición a la api para mostrar todos los poke
      const apiData = await axios.get("http://localhost:3001/pokemons");
      const pokemons =  apiData.data.map((pokemon) => {
        return {
          id: pokemon.pokemonId,
          name: pokemon.name,
          image: pokemon.image,
          types:pokemon.types,
          attack:pokemon.attack,
          hp:pokemon.hp,
          defense:pokemon.defense,
          speed:pokemon.speed,
          weight:pokemon.weight,
          height:pokemon.height,
        };
      });
      dispatch({ type: GET_ALL_POKE, payload: pokemons });
    };
  };

  export const getPokemon=(id)=>{
    return async function(dispatch){
      const apiData=await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch ({type:GET_POKEMON, payload: apiData.data})
    }
  }

  //setea el detail del pokemon
  export const clearPokemon = () => ({
    type: "CLEAR_POKEMON",
  });

  //setea la pagina al borrar el nombre que está en el searchbar
  export const clearSearch = () => ({
    type: "CLEAR_SEARCH",
  });

  export const getName = (name) =>{
    return async function(dispatch){
      try {
        const apiData=await axios.get(`http://localhost:3001/pokemons/name/${name}`)
        return dispatch ({type:GET_NAME, payload:apiData.data})   
      } catch (error) {
        console.error(error)
        alert(('Pokemon not found'))
      }
    }
  }

  export const getTypes=()=>{
    return async function(dispatch){
      try {
        const apiData=await axios.get('http://localhost:3001/types')
        return dispatch ({type:GET_TYPES, payload:apiData.data})   
      } catch (error) {
        console.error(error)
      }
    }
  }

  export const filterTypes=(type)=>(dispatch, getState)=>{
    try {
      const { originalPokemons } = getState();

      const filteredPokemons = originalPokemons.filter((pokemon) =>
        pokemon.types.includes(type) || pokemon.types.includes(type.split(" ")[0]) || pokemon.types.includes(type.split(" ")[1])
      );
      if(filteredPokemons.length===0){
        alert(("There isn't any pokemons with this type"))
        return;
      }
      return dispatch({type:FILTER_BY_TYPE, payload:filteredPokemons})  
    } catch (error) {
      console.error(error)
    }
    
  }


  export const orderPoke=(order)=>{
    return{
      type:ORDER,
      payload:order
    }
  }

  export const damage=(damage)=>{
    return{
      type:DAMAGE,
      payload:damage
    }
  }