import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, EmptyDetail, orderByName, FilterByContinent, FilterActivity, getActivity, FilterByPopulation } from '../../reducer/actions/actions';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
/* import Card from './Card'; */
import CountryCard from '../CountryCard/CountryCard'
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';

function Home() {
    const dispatch = useDispatch()
    
    const allCountries = useSelector((state) =>state && state.countries )
    const activities = useSelector((state) => state && state.activities)

    const [/* order */, setOrder] = useState('');
// Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesPerPage -1; 
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage; // 0
  const currentCountry = allCountries?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
    

    const paginacion = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }
    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivity())

        return ()=> {
            dispatch(EmptyDetail())
        };

    },[dispatch])
   

    const handleOnClick = () => {
        window.location.reload()
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(e.target.value)
        if(document.getElementById("continentSelect").getElementsByTagName('option')[0].selected !== 'selected'){
            document.getElementById("continentSelect").getElementsByTagName('option')[0].selected = 'selected'
            document.getElementById("populationSelect").getElementsByTagName('option')[0].selected = 'selected'
            document.getElementById("activitynSelect").getElementsByTagName('option')[0].selected = 'selected'
        }
        document.getElementById("populationSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("activitynSelect").getElementsByTagName('option')[0].selected = 'selected'
    }

    function handleFilterByContinent(e) {
        e.preventDefault()
        dispatch(FilterByContinent(e.target.value));
        setCurrentPage(1)
        document.getElementById("populationSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("activitynSelect").getElementsByTagName('option')[0].selected = 'selected'
    }

    function handleFilterByActivity(e) {
        e.preventDefault()
        dispatch(FilterActivity(e.target.value));
        setCurrentPage(1) 
        document.getElementById("nameSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("continentSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("populationSelect").getElementsByTagName('option')[0].selected = 'selected'
    }

    function populationOrder(e) {
        e.preventDefault()
        dispatch(FilterByPopulation(e.target.value));
        setOrder(e.target.value)
        if(document.getElementById("nameSelect").getElementsByTagName('option')[0].selected !== 'selected'){
            document.getElementById("nameSelect").getElementsByTagName('option')[0].selected = 'selected'
            document.getElementById("activitynSelect").getElementsByTagName('option')[0].selected = 'selected'
        }
        document.getElementById("activitynSelect").getElementsByTagName('option')[0].selected = 'selected'
    }

    


  return (
    <div  >
        <header>
            <div className={styles.nav} >
                <div className={styles.reffresh} >
                    <button onClick={handleOnClick} >Reffresh</button>
                </div>
                <div className={styles.searchBar} >
                    <SearchBar pages={setCurrentPage}/>
                </div>
                <div>
                    <select id="nameSelect" onChange={e => handleSort(e)}className={styles.select}>
                        <option >    Order by name        </option>
                        <option value='asc' >  A-Z </option>
                        <option value='desc'>  Z-A </option>
                    </select>
                    <select id="continentSelect" onChange={e => handleFilterByContinent(e)}className={styles.select}>
                        <option value='All'>All Continents</option>
                        <option value='Africa'>Africa</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Antarctica'>Antarctica</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                    <select id="populationSelect" onChange={e => populationOrder(e)} className={styles.select}>
                        <option >  Order by population     </option>
                        <option value='DESC' >  Ascendent </option>
                        <option value='ASC'>  Descendant </option>
                    </select>
                    <select id="activitynSelect" onChange={e => handleFilterByActivity(e)}className={styles.select}>
                        <option  value='All'>All Activities</option>
                        {activities?.map(e => ( 
                            <option value={e.name}
                                    key={e.id}> {e.name} 
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
        
        <div> 
            <h1 className={styles.h1}>  Countries Of The World! 🌎   </h1>
           
            <ul className={styles.container}>

            {  currentCountry && currentCountry.length > 0  ? 
                currentCountry?.map(e => (
                    e.Error ? 
                    <div className={styles.error404}>
                        <Link onClick={handleOnClick}>
                            <img src="https://img.freepik.com/vector-premium/404-pagina-error-no-encontrada-ilustracion-tierra-triste_9638-4.jpg" alt="Not found" />
                        </Link>
                    </div>  :
                    <CountryCard
                        name={e.name}
                        continent={e.continents}
                        flags={e.flags}
                        id={e.id}
                        key={e.id}
                /> 
                )
            )
            : <div className={styles.gifContainer}><img src='https://upload.wikimedia.org/wikipedia/commons/9/96/Mundo_hecho_de_Banderas.gif' alt='Loading' className={styles.gif} /></div>  }
            </ul>
        </div>
        <div className={styles.paginattion} >
        { allCountries &&
            <Pagination
            currentPage={currentPage}
            countryPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginacion={paginacion} />
        }</div>
    </div>
  )
}

export default Home


