import React from 'react'
import {Link} from 'react-router-dom';
import styles from '../styles/card.module.css';

function Card({country}) {
  const handleOnClick = () => {
    window.location.reload()
  }
  return (
    <div>
      {country.length > 0 ? (
        country.map((count) => (
          count.Error ? 
          <div>
            <div>
              <button onClick={handleOnClick}>BACK</button>
            </div>
            <Link onClick={handleOnClick}>
              <img src="https://img.freepik.com/vector-premium/404-pagina-error-no-encontrada-ilustracion-tierra-triste_9638-4.jpg" alt="Not found" />
            </Link>
          </div>  :
          <div className={styles.div} >
            <div className={styles.card} key={count.id}>
              <img className={styles.countryImage} src={count.flags} alt={count.name} />
              <div className={styles.cardBody}>
                <h3>{count.name}</h3>
                <h3>Continent: {count.continents}</h3>
              </div>
              <Link className={styles.cardLink} to={'/home/' + count.id}>
                Learn More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <img src='https://upload.wikimedia.org/wikipedia/commons/9/96/Mundo_hecho_de_Banderas.gif' alt='Loading' />
      )}
    </div>
  )
}

export default Card