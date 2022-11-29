import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const baseURL = "http://localhost:3001";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID'
export const EMPTY_DETAIL = 'EMPTY_DETAIL'
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY'
export const GET_ACTIVITY = 'GET_ACTIVITY'
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const DELETE_ACTIVITY = 'DELETE_COUNTRY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'



export function getCountries(){
    return async function (dispatch){
        
        const json = await axios.get(`${baseURL}/country`)
        console.log(json)
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data,
            
        })
    }
    }

    


export function ChangePage(page){
    return function(dispatch) {
        return dispatch({
        type: CHANGE_PAGE,
        payload: page
    })}
}
export function getCountryById(id){
    return async function(dispatch){
        try {
            let aux = await axios.get(`${baseURL}/countries/${id}`)
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload:aux.data
            })
        } catch (error) {
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: error
            })
        }
        
    }
}

export function EmptyDetail(){
    return function (dispatch){
        dispatch({type: EMPTY_DETAIL})
    }
}

export function getCountryByName(name){
    return async function (dispatch){
        try {
            const aux = await axios.get(`${baseURL}/country?name=${name}`)
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: aux.data
            })
        } catch (error) {
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: error
            })
        }
    }
}

export function orderByName(order){
    return{
        type:ORDER_BY_NAME,
        payload: order
        
    }
}

export function FilterActivity(activity){
    return{
        type: FILTER_ACTIVITY,
        payload: activity
    }
}

export function FilterByContinent(continent){
    return{
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}

export function getActivity(){
    return async function (dispatch) {
        try {
            const aux = await axios.get(`/activity`)
            return dispatch({
                type: GET_ACTIVITY,
                payload: aux.data
            })
        } catch (error) {
            return dispatch({
                type: GET_ACTIVITY,
                payload: error
            })
        }
      }
}

export function FilterByPopulation(population){
    return {
        type: FILTER_BY_POPULATION,
        payload: population
    }
}

export function DelteActivity(id){
    return async function(dispatch){
        return axios
            .delete(`${baseURL}/Activity/${id}`)
            .then (({data})=>{
                dispatch({type: DELETE_ACTIVITY, payload: data})
            })
    }
}

export function CreateActivity(activity){
    return async function(dispatch){
        const response = await axios.post(`${baseURL}/activities`, activity)
        return dispatch({
            type: CREATE_ACTIVITY,
            payload: response.data

        })
    }
}