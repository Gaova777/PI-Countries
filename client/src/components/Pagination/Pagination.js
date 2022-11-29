import React from 'react';
import styles from './Pagination.module.css'


function Pagination({countryPerPage, currentPage, allCountries, paginacion}) {
  const pageNumbers = [];

  let maxPages = 1 + Math.ceil((allCountries - 9) / countryPerPage);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }


  return (
    <div>
      {pageNumbers?.map((num) => {
        return (
          <button className={(currentPage === num) ? `${styles.btn_active} ${styles.btn}` : `${styles.btn}`}
            id={num}
            value={num}
            key={num}
            onClick={() => paginacion(num)}>
            {num}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination