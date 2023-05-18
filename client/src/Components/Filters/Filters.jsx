import React, {useState, useEffect} from 'react'
import styles from './Filters.module.css'
import { getTypes, filterTypes, orderPoke, damage, getAllPokemon} from '../../Redux/actions'
import {useDispatch, useSelector} from 'react-redux'

const Filters = () => {
const dispatch=useDispatch()
const state = useSelector((state) => state);
const [filtersApp, setFiltersApp]=useState(false)
const [alph, setAlph]=useState('all')
const [orderDamage, setorderDamage]=useState('all')
const [type, setTypes]=useState('all')

const alphHandler=(e)=>{
  const value = e.target.value;
  if (value === "all") {
    dispatch(getAllPokemon());
  } else {
    dispatch(orderPoke(value));
  }
  setAlph(value);
}

function damageHandler(e) {
  const value = e.target.value;
  if (value === "all") {
    dispatch(getAllPokemon());
  } else {
    dispatch(damage(value));
  }
  setorderDamage(value);
}

useEffect(()=>{
  dispatch(getTypes())
}, [dispatch, type])

function handleFilter(e) {
  const value = e.target.value;
  if (value === "all") {
    dispatch(getAllPokemon());
  } else if (value === "type") {
    setTypes(true);
  } else {
    dispatch(filterTypes(value));
    setFiltersApp(true);
  }
  setTypes(value);
}

function handleClearFilters(){
  setAlph('all')
  setorderDamage('all')
  setTypes('all')
  setFiltersApp(false)
  dispatch(getAllPokemon())
  const typeSelector=document.querySelector('select:nth-child(2)')
  if(typeSelector){
    typeSelector.value='all'
  }
}
  

  return (
    <div className={styles.filters}>
        <div>
          <label className={styles.alph}>Alphabetical Order</label>
        <select onChange={alphHandler} value={alph}>
            <option value="order" disabled='disabled'>Order by</option>
            <option value="all">All</option>
            <option value="asc">A - Z</option>
            <option value="dsc">Z - A</option>
        </select>
        </div>
        <div>
          <label className={styles.damage}>Damage Order</label>
        <select onChange={damageHandler} value={orderDamage}>
            <option value="order" disabled='disabled'>Order by</option>
            <option value="all">All</option>
            <option value="max">Max attack</option>
            <option value="min">Min attack</option>
        </select>
        </div>
        <div>
          <label className={styles.type}>Filter by Type</label>
        <select onChange={handleFilter} value={type}>
            <option value="filter" disabled='disabled'>Filter by</option>
            <option value="all">All</option>
            {state.types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
        </select>
        </div>
        <button className={styles.btn} onClick={handleClearFilters}>Clear filters</button>
    </div>
  )
}

export default Filters