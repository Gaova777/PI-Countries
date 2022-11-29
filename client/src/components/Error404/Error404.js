import React from 'react';
import styles from './Error404.module.css';

function Error404() {
  return (
    <div>
        <h3 className={styles.letter} >Error 404</h3>
        <p className={styles.letter} >Data Not Found</p>
    </div>
  )
}

export default Error404