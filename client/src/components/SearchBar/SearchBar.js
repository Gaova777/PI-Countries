import React from 'react';
import { Link } from "react-router-dom";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getCountryByName } from "../../reducer/actions/actions";
import styles from './SearchBar.module.css';

function SearchBar({pages}) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  function handleInputChange (e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getCountryByName(name))
    setName('')
    pages(1)
  }
  

  return (
    <div className={styles.container}>
      <input 
        className={styles.input}
        autoComplete="off"
        type="text" 
        placeholder='Search...'
        id="search"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.but}
        type='submit' 
        onClick={(e) => handleSubmit(e)} >Search
      </button>
      <div className={styles.divLink} >
        <Link className={styles.link} to='/activities' >
          Create your own activity!
        </Link>
      </div>
    </div>
  )
}

export default SearchBar