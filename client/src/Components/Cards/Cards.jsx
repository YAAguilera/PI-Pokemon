import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Cards.module.css'
import noImg from '../../images/poke_load.gif'

const Cards = ({id, name, image, types, type}) => {
  return (
    <div className={styles.main}>
       <Link to={`/detail/${id}`} style={{textDecoration:"none"}}>
        <h4 className={styles.id}>#00{id}</h4>
        <h2 className={styles.name}>{name}</h2>
        <h3 className={styles.types}>Type: {types ? types:type}</h3>
        <img src={image ? image : noImg} alt={name} className={styles.img}/>
      </Link>
    </div>
  )
}

export default Cards