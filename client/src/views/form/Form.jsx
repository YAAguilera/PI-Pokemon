import React from 'react'
import axios from 'axios';
import styles from './Form.module.css'
import { useState, useEffect } from 'react';
import noImg from '../../images/load.gif'

const PokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "ground",
  "poison",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];

const Form = () => {
const initialState={
  name:"",
  hp:"",
  attack:"",
  defense:"",
  speed:"",
  height:"",
  weight:"",
  types:[],
  image:"",
}

const [formValues, setformValue]=useState(initialState)
const [error, setError]=useState({})



const validations=(values)=>{
  const error={};
  const validText=/^[a-zA-Z]+$/;

//name
if(!values.name){
  error.name='Name required'
}
else if(!validText.test(values.name)){
  error.name='Name must be only letters'
}
else if(values.name.length>30){
  error.name='Name must be shorter than 30 letters'
}

//hp
if(!values.hp){
  error.hp='Hp required'
}
else if(values.hp>100){
  error.hp='Value must be less than 100'
}
else if(values.hp<1){
  error.hp='Value must be larger than 1'
}

//attack
if(!values.attack){
  error.attack='Attack required'
}
else if(values.attack>100){
  error.attack='Value must be less than 100'
}
else if(values.attack<1){
  error.attack='Value must be larger than 1'
}

//defense
if(!values.defense){
  error.defense='Defense required'
}
else if(values.defense>100){
  error.defense='Value must be less than 100'
}
else if(values.defense<1){
  error.defense='Value must be larger than 1'
}

//speed
if(!values.speed){
  error.speed='Speed required'
}
else if(values.speed>100){
  error.speed='Value must be less than 100'
}
else if(values.speed<1){
  error.speed='Value must be larger than 1'
}
//height
if(!values.height){
  error.height='Height required'
}
else if(values.heigth>100){
  error.height='Value must be less than 100'
}
else if(values.height<1){
  error.height='Value must be larger than 1'
}
//weight
if(!values.weight){
  error.weight='Weight required'
}
else if(values.weight>100){
  error.weight='Value must be less than 100'
}
else if(values.weight<1){
  error.weight='Value must be larger than 1'
}
//types
if (!values.types.length) {
  error.types = "Must choose at least 1 type";
} 
if(values.types.length>2){
  error.types= "Can only choose up to 2 types"
}

//img
if(!values.image){
  values.image=noImg
}
return error
}




const handleChange = (e) => {
  //cuando se agrega un valor al form, se actualiza el estado
  const { name, value } = e.target;
  setformValue({ ...formValues, [name]: value });
  //se valida si los valores están bien
  const valor = validations({ ...formValues, [name]: value });
  setError(valor);
};

console.log(formValues)
//maneja los cambios en los checkboxes de selección de tipos de poke. Cuando se marca o desmarca una casilla, esta función actualiza el estado formValues con los nuevos valores de selección de tipos y los valida
const handleTypeChange = (e) => {
  var valor;
  const temporalType = e.target.value;
  if (e.target.checked) {
    // Agrega el tipo seleccionado
    setformValue({
      ...formValues,
      types: [...formValues.types, temporalType],
    });
    valor = validations({
      ...formValues,
      types: [...formValues.types, temporalType],
    });
  } else {
    // Quita el tipo deseleccionado
    let filtrar = formValues.types.filter((t) => t !== temporalType);
    setformValue({
      ...formValues,
      types: filtrar,
    });
    valor = validations({
      ...formValues,
      types: filtrar,
    });
  }
  setError(valor);
};

 const handleSubmit = (e) => {
  //cuando se envía el form
  e.preventDefault();
  //si hay errores, no se manda
  if (Object.keys(error).length > 0) {
    alert("Complete all fields correctly");
  
  //si no hay errores se crea un objeto formData con los valores introducidos y se envía una solicitud POST al servidor para agregar un nuevo Pokémon a la base de datos.
  } else {
    //para renderizar los types en la card
    const typeString = formValues.types.join(" & ");
    const formData = {
      ...formValues,
      types: typeString
    };
    console.log("este es formData",formData)
    axios
      .post("http://localhost:3001/pokemons", formData)
      .then((res) => alert("Pokemon has been created"))
      .catch((err) => alert(err));
  }
};

  return (
    <div className={styles.cont}>
        <form className={styles.formCont} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Create your own Pokemon!</h1>
            <div className={styles.inputs}>
              <div className={styles.name}>
              <label htmlFor="name">Name:</label>
              <input type="text" name='name' onChange={handleChange} value={formValues.name}/>
              <p className={styles.errors}>{error.name}</p>
              </div>
              <div className={styles.hp}>
              <label htmlFor="hp">Hp:</label>
              <input type="number" name='hp' onChange={handleChange} value={formValues.hp}/>
              <p className={styles.errors}>{error.hp}</p>
              </div>
              <div className={styles.attack}>
              <label htmlFor="attack">Attack:</label>
              <input type="number" onChange={handleChange} name="attack" value={formValues.attack} />
              <p className={styles.errors}>{error.attack}</p>
              </div>
              <div className={styles.defense}>
              <label htmlFor="defense">Defense:</label>
              <input type="number" onChange={handleChange} name="defense" value={formValues.defense}/>
              <p className={styles.errors}>{error.defense}</p>
              </div>
              <div className={styles.speed}>
              <label htmlFor="speed">Speed:</label>
              <input type="number" name='speed'onChange={handleChange} value={formValues.speed}/>
              <p className={styles.errors}>{error.speed}</p>
              </div>
              <div className={styles.height}>
              <label htmlFor="height">Height:</label>
              <input type="number" name='height' onChange={handleChange} value={formValues.height}/>
               <p className={styles.errors}>{error.height}</p>
              </div>
              <div className={styles.weight}>
              <label htmlFor="weight">Weigth:</label>
              <input type="number" onChange={handleChange} name="weight" value={formValues.weight}/>
              <p className={styles.errors}>{error.weight}</p>
              </div>
              <div className={styles.img}>
              <label htmlFor="image">Image:</label>
              <input type="text" name='image' onChange={handleChange} value={formValues.image} src={formValues.image? formValues.image: noImg}/>
              </div>
              <div>
                <fieldset className={styles.typesCont}>
                  <legend>Types:</legend>
                  <div>
                {PokemonTypes.map((type) => { 
                return (
               <label htmlFor={type} key={type}>
                <input type="checkbox" name="type" value={type}  onChange={handleTypeChange}/>
                {type}
              </label>
          )
         })}
        </div>
        <p className={styles.errors}>{error.types}</p>
                </fieldset>
              </div>
            <button className={styles.btn} type='submit'>Create</button>
            </div>
            
        </form>
    </div>
  )
}

export default Form