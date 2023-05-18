import React from 'react'
import styles from "./Paginado.module.css"

const Paginado = ({page, setPage, max}) => {
    const pages = Array.from({length: max}, (_, i) => i + 1);
  return (
    <div className={styles.fooBtn}>
    <button className={styles.fBtn} disabled={page === 1} onClick={() =>{if(page>1){setPage(page-1)}}}>{"<"}
    </button>
    {/* Mostrar botones para cada página */}
    {pages.map((p) => (
      <button
        key={p}
        className={`${styles.fBtn} ${p === page ? styles.currentPage : ''}`}
        onClick={() => setPage(p)}>{p}
      </button>
    ))}
    <button className={styles.fBtn} disabled={page === max? true:false} onClick={() => setPage(page + 1)}>{">"}</button>
  </div>
  )
}
export default Paginado