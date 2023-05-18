import React from 'react'
import styles from '../NavBar/NavBar.module.css'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const NavBar = ({onSearch}) => {
  const location=useLocation()

  const isHomePage = location.pathname === "/home";
  return (
    <div className={styles.main}>
      <div className={styles.cont}>
        <Link to="/home" className={styles.link}>Home</Link>
        {isHomePage && <div className={styles.search}>
          <SearchBar onSearch={onSearch}/>
        </div>}
        <Link to="/form" className={styles.form}>Create Pokemon</Link>
      </div>
    </div>
  )
}

export default NavBar