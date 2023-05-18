import React from 'react'
import load from '../../images/poke_load.gif'
import styles from './Error.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Error = () => {
  return (
    <div className={styles.main}>
        <div className={styles.cont}>
            <h1 className={styles.main404}><span className={styles.four}> 4</span> <img className={styles.img} src={load} alt="poke" /> <span className={styles.four}>4</span></h1>
            <h3 className={styles.notfound}>Uh-Oh!Page not found</h3>        
        </div>
        <div>
            <Link to='/home'>
            <button className={styles.btn}>Go back home</button>
            </Link>   
        </div>
    </div>
  )
}

export default Error