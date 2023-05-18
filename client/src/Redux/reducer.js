import { GET_ALL_POKE, GET_POKEMON, CLEAR_POKEMON, GET_NAME, CLEAR_SEARCH, GET_TYPES, FILTER_BY_TYPE, ORDER, DAMAGE } from "./actions";

const initialState = {
    pokemons: [],
    originalPokemons: [],
    pokemon:{},
    currentPoke:{},
    types:[]
  };

  const rootReducer=(state = initialState, { type, payload })=>{
    switch(type){
        case GET_ALL_POKE:
            return {...state, pokemons: payload, originalPokemons: payload}

        case GET_POKEMON:
            return {
              ...state, 
             pokemon:{...state.pokemon, payload}
        }

        case CLEAR_POKEMON:
          return {...state, pokemon:{}}
        
        case GET_NAME:
          return{...state, currentPoke:payload}

        case CLEAR_SEARCH:
          return{...state, currentPoke:{}}

        case GET_TYPES:
          return {...state, types:payload}

        case FILTER_BY_TYPE:
          return{...state, pokemons:payload}

        case ORDER:
            var pokeOrder;
          payload === "asc"
            ? (pokeOrder = state.pokemons.sort((a, b) =>
                a.name.localeCompare(b.name)
              ))
            : (pokeOrder = state.pokemons.sort((a, b) =>
                b.name.localeCompare(a.name)
              ));
              return {
                ...state,
                pokemons: pokeOrder,
              };

              case DAMAGE:
                var orderDamage;
                if (payload === "all") {
                  orderDamage = state.pokemons;
                } 
                if (payload === "max") {
                  orderDamage = state.pokemons.sort((a, b) => b.attack - a.attack);
                } 
                 if (payload === "min") {
                  orderDamage = state.pokemons.sort((a, b) => a.attack - b.attack);
                }
                return {
                  ...state,
                  pokemons: orderDamage,
                };

        default:
            return {...state}
    }
  }

  export default rootReducer;