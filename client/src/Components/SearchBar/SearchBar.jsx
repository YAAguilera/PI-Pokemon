import React from 'react'
import styles from "./SearchBar.module.css"
import { getName, getAllPokemon, clearSearch } from '../../Redux/actions'
import {useDispatch} from 'react-redux'
import { useState } from 'react'


const SearchBar = () => {
  const [name, setName]=useState('')
  const dispatch=useDispatch()  

  const handleChange = (event) =>{
    if(event.target.value===''){
      dispatch(clearSearch())
    }
    setName(event.target.value)
  }

  const handleSearch = () =>{
    dispatch(getName(name))
  }

  const handleKeyPress = (event) =>{
    if(event.key==='Enter'){
      if(name.length!==0){
        handleSearch()
      }
      else{
        dispatch(getAllPokemon())
      }
    }
  }

    return (
    <div className={styles.main}>
    <input type='search' placeholder="Search..." onChange={handleChange} value={name} onKeyPress={handleKeyPress}/>   
    </div>
  )
}   

export default SearchBar