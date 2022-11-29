import {
    GET_COUNTRIES,
    GET_COUNTRY_BY_ID, 
    EMPTY_DETAIL,
    GET_COUNTRY_BY_NAME,
    ORDER_BY_NAME ,
    FILTER_BY_CONTINENT, 
    FILTER_ACTIVITY,
    GET_ACTIVITY,
    FILTER_BY_POPULATION,
    CREATE_ACTIVITY, 
    CHANGE_PAGE,
    DELETE_ACTIVITY,
} from '../actions/actions'


const initialState = {
    countries: [],
    allCountries: [],
    detail: [],
    activities: [], 
    page:0
    
}


function rootReducer (state = initialState, action){
   
    if(action.type === GET_COUNTRIES){
        console.log(action.payload)
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload,
    
        }
        
        
    }
    if(action.type === GET_COUNTRY_BY_NAME){
        console.log(action.payload.error)
        return{
            ...state,
            countries: action.payload.error ? [{Error: 'No Country found'}] : action.payload
        }
    }
    if(action.type === GET_COUNTRY_BY_ID){
        return {
            ...state,
            detail: action.payload,
        }
    }
    if(action.type === ORDER_BY_NAME){
        const sortCountries = action.payload === 'asc'
        ? state.allCountries.sort((a, b) => a.name.localeCompare(b.name))
        : state.allCountries.sort((a, b) => b.name.localeCompare(a.name))
        return {
            ...state,
            countries: sortCountries,
        }
    }
    if(action.type === FILTER_BY_CONTINENT){
        const allCountries = state.allCountries
        const continentFilter = action.payload === 'All' ?
        allCountries
        : allCountries.filter((country) => country.continents === action.payload)

        return {
            ...state,
            countries: continentFilter,
        }
    }
    if(action.type === GET_ACTIVITY){
        return{
            ...state,
            activities: action.payload
        }
    }
    if(action.type === FILTER_BY_POPULATION){
        const filterPopulation = action.paylod === 'asc' 
        ? state.countries.sort((a,b)=> {
            return Number(a.population) > Number(b.population) ? -1 :Number(a.population) < Number(b.population) ? 1 : 0;
        })
        : state.countries.sort((a,b)=>{
            return Number(a.population) > Number(b.population)
            ? 1
            : Number(a.population) < Number(b.population)
            ? -1
            : 0;
        })
        return {
            ...state,
            countries: filterPopulation,
        }

    }
    if(action.type === FILTER_ACTIVITY){
        const allCountriesAct = state.allCountries
            const activitiesFilter = action.payload === 'All'
            ? allCountriesAct
            : allCountriesAct.filter(c => c.activities && c.activities.map(e => e.name).includes(action.payload))

            return {
                ...state,
                countries: activitiesFilter,
            }
            
    }
    if(action.type ===EMPTY_DETAIL){
        return {
            ...state,
            detail: [],
        }
    }
    if(action.type === CREATE_ACTIVITY){
        return{
            ...state,
            activities: [...state.activities, action.payload],
            // allCountries: [...state.allCountries, action.payload]
        }
    }
    if(action.type === DELETE_ACTIVITY){
        const Activity = state.activities.filter((activity)=> activity.id !== action.payload)
        return{
            ...state,
            activities: Activity.length > 0 ? Activity : "NO ACTIVITIES"
        }
    }
    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload,
        };
    }
}

export default rootReducer;