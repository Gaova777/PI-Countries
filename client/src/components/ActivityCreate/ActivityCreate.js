import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, CreateActivity } from '../../reducer/actions/actions';
import styles from './ActivityCreate.module.css';


function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const country = useSelector((state) => state.countries)
  const [error , setError] = useState({})
  const [input, setInput] = useState({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      country: []
  })
  
  useEffect(() => {
      dispatch(getCountries())
  }, [dispatch])

  function handleOnChange(e) {
      
      setInput((state) => {
          const newState ={
              ...state,
              [e.target.name]: e.target.value
              
          }
          setError(validate(newState))
          return  newState;
      })
      
  }

  function handleSelect(e) {
        if(input.country.includes(e.target.value)){
            return
        }
      setInput({
          ...input,
          country: [...input.country, e.target.value]
      })
      
  }

  function handleSubmit(e) {
        console.log(input)
        if (input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/)) || !input.difficulty || !input.duration || !input.season || input.country.length === 0 ){
            e.preventDefault()
          alert('All fields must be completed')
      } else {
          e.preventDefault()
          dispatch(CreateActivity(input))
          alert('Activity was created successfully')
          setInput({
              name: '',
              difficulty: '',
              duration: '',
              season: '',
              country: []
          })
          history.push('/home') 
      };
  }  

  function handleDelete(e) {
      setInput({
          ...input,
          country: input.country.filter(c => c !== e)
      })
  }

  function validate(input){
      let error = {};
      if(input.name.length < 3){
          error.name = 'Name of activity must be valid'
      }if(!input.name.match( (/^[A-Za-z]+$/))){
          error.name = 'Name of activity must contain only letters'
      }
      if(!input.duration || input.duration <= 0 || input.duration > 24){
          error.duration = 'Duration must be specified in hours'
      }
      if(!input.season){
          error.season = 'Season is required'
      }
      if(!input.difficulty){
          error.difficulty = 'Difficulty is required'
      }
      if(!input.country){
          error.country = 'Country is required'
      }
      return error
    }

  return (
    <div >
        <div className={styles.nav}>
            <li className={styles.li}><Link to='/home'>BACK TO HOME</Link></li>
        </div>
        <h1 className={styles.h1} >Create Activity</h1>
        <div className={styles.iner}> 
            <div className={styles.formulario}>
                
                <form  onSubmit={(e) => handleSubmit(e)} >
                    <div >
                        <div className={styles.latter} >
                            <label > Name of the activity : </label>
                            <input
                                placeholder='Activity'
                                type='text'
                                value={input.name}
                                name='name'
                                autoComplete='off'
                                onChange={handleOnChange}/>
                                {error.name && <p className={styles.p}>{error.name}</p>}
                        </div>
                        <div className={styles.latter} >
                            <label >Difficulty : </label>
                            <label>
                                <input
                                    type='radio'
                                    value='1'
                                    name='difficulty'
                                    onChange={handleOnChange}/>
                                    
                                1</label>
                            <label>
                                <input
                                    type='radio'
                                    value='2'
                                    name='difficulty'
                                    onChange={handleOnChange}
                                />
                                2</label>
                            <label>
                                <input
                                    type='radio'
                                    value='3'
                                    name='difficulty'
                                    onChange={handleOnChange}
                                />
                                3</label>
                            <label>
                                <input
                                    type='radio'
                                    value='4'
                                    name='difficulty'
                                    onChange={handleOnChange}
                                />
                                4</label>
                            <label>
                                <input

                                    type='radio'
                                    value='5'
                                    name='difficulty'
                                    onChange={handleOnChange}
                                />
                                5</label>
                                {error.difficulty && <p className={styles.p}>{error.difficulty}</p>}
                        </div>
                        <div className={styles.latter} >
                            <label>Duration : </label>
                            <input
                                placeholder= 'Time in hours'
                                type='number'
                                value={input.duration}
                                name='duration'
                                autoComplete='off'
                                min='0'
                                onChange={handleOnChange} />
                                {error.duration && <p className={styles.p}>{error.duration}</p>}
                        </div>
                        <div className={styles.latter} >
                            <label >Season : </label>
                            <label>
                                <input
                                    type='radio'
                                    value='Summer'
                                    name='season'
                                    onChange={handleOnChange}
                                />
                                Summer</label>
                            <label>
                                <input
                                    type='radio'
                                    value='Spring'
                                    name='season'
                                    onChange={handleOnChange}
                                />
                                Spring</label>
                            <label>
                                <input
                                    type='radio'
                                    value='Fall'
                                    name='season'
                                    onChange={handleOnChange}
                                />
                                Fall</label>
                            <label>
                                <input
                                    type="radio"
                                    value='Winter'
                                    name='season'
                                    onChange={handleOnChange}
                                />
                                Winter</label>
                                {error.season && <p className={styles.p}>{error.season}</p>}

                        </div>
                        <div className={styles.latter} >
                            <label >Country : </label>
                            <div className={styles.btn} >
                                <select
                                    onChange={(e ) => handleSelect(e)} >
                                    {country && country.map((e, i ) => (
                                        <option
                                        value= {e.name}
                                        key={e.id + i} 
                                        >{e.name}
                                        </option>
                                    ))}
                                </select>
                            </div> 
                            {error.country && <p className={styles.p}>{error.country}</p>}               
                        </div>
                        {input.country.map((e) =>
                            <ul key = {e}>
                                <p >{e}</p>
                                <button 
                                    type='button'
                                    onClick={() => handleDelete(e)}>X</button>
                            </ul>
                        )}
                        <div className={styles.latter} >
                            <input type='submit' value='Create' disabled={Object.keys(error).length} />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default ActivityCreate