import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_SEARCH_VIDEOGAMES = 'GET_SEARCH_VIDEOGAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_DETAIL = 'GET_DETAIL';
export const SORT = 'SORT';

export function getAllVideogames(){
    return async function(dispatch){
        try {
            const { data } = await axios.get('http://localhost:3001/videogames')
            dispatch({
                type: 'GET_ALL_VIDEOGAMES', payload: data
            })            
        } catch (error) {
            console.log(error)            
        }
    }
}
export function getAllGenres(){
    return async function(dispatch){
        try {
            let { data } = await axios.get('http://localhost:3001/genres')
            dispatch({
                type: 'GET_ALL_GENRES', payload: data
            })
        } catch (error) {
            console.log(error)            
        }
    }
}

export function getSearchVideogames(){
    return async function(dispatch){
        try {
            let { data } = await axios.get('http://localhost:3001/videogames/search')
            dispatch({
                type: 'GET_SEARCH_VIDEOGAMES', payload: data
            })
        } catch (error) {
            
        }
    }

}

export function getDetail(id){
    return async function(dispatch){
        try {
            let { data } = await axios.get('http://localhost:3001/videogames/id/' + id)
            dispatch({
                type: 'GET_DETAIL', payload: data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}

export function sort(order){
    return {
        type: 'SORT',
        payload: order
    }
}