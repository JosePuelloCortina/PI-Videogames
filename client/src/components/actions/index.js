import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_SEARCH_VIDEOGAMES = 'GET_SEARCH_VIDEOGAMES';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_DETAIL = 'GET_DETAIL';
export const SORT = 'SORT';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const CREATE_VIDEOGAMES = 'CREATE_VIDEOGAMES';
export const FILTER_BACK = 'FILTER_BACK';
export const FILTER_RATING = 'FILTER_RATING';
export const LIMPIAR_DETAIL = 'LIMPIAR_DETAIL';

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

export function getSearchVideogames(name){
    return async function(dispatch){
        try {
            let res = await axios.get('http://localhost:3001/videogames/search?name=' + name)
            dispatch({
                type: GET_SEARCH_VIDEOGAMES, payload: res.data
            })
        } catch (error) {
            console.log(error)
            
        }
    }

}

export function getDetail(id){
    return async function(dispatch){
        try {
            let { data } = await axios.get(`http://localhost:3001/videogames/id/${id}`)
            dispatch({
                type: 'GET_DETAIL', payload: data
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}
export function limpiarDetail(payload){
    return{
        type: LIMPIAR_DETAIL,
        payload:{}
    }
}

export function sort(order){
    return {
        type: 'SORT',
        payload: order
    }
}

export function filterByGenres(payload){
    return{
        type: 'FILTER_BY_GENRES', payload
    } 
}

export function filterBack(payload){
    return{
        type: 'FILTER_BACK', payload
    }
}

export function filterRating(payload){
    return{
        type: 'FILTER_RATING', payload
    }
}



// export function createVideogame(){
//     return async function(dispatch){
//         try {
//             let { data } = await axios.get('http://localhost:3001/videogames/add')
//             dispatch({
//                 type: 'GET_DETAIL', payload: data
//             })
//         } catch (error) {
//             console.log(error)
            
//         }
//     }
// }
