import React from 'react'
import {Link} from 'react-router-dom';
import styles from './CountryCard.module.css'

const CountryCard = ({flags, name,continent,id}) => {
 
  return (
    
    <Link to= {'/home/' + id}>
    <div className={styles.div} >
        <div className={styles.card}>
               {flags && <img src={flags} alt= 'Img not found' width='220px' height='115px'className={styles.countryImage}/>}
                <h3>{name }</h3>
                <h3>{continent}</h3>               
        </div>
    </div>
    </Link>
  )
}

export default CountryCard