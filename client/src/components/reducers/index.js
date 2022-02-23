import { GET_ALL_GENRES, GET_ALL_VIDEOGAMES, GET_DETAIL, GET_SEARCH_VIDEOGAMES, SORT } from '../actions/index';
import { ASCENDENTES } from "../constantes/sort";

const initialState = {
    videogames: [],
    filters: [],
    genres: [],
    detail: [],
}

function rootReducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                filters: action.payload,
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_SEARCH_VIDEOGAMES:
            return{
                ...state,
                filter: action.payload
            }
        case GET_DETAIL: 
            return{
                ...state,
                detail: action.payload
            }
        case SORT:
            let orderVideogames = [...state.videogames];
            orderVideogames = orderVideogames.sort((a, b) =>{
                if(a.name < b.name){
                    return action.payload === ASCENDENTES ? -1 : 1;
                }
                if(a.name > b.name){
                    return action.payload === ASCENDENTES ? 1 : -1;
                }
                return 0;
            })
            return{
                ...state,
                filters: orderVideogames
            }
        default: return state;
    }
}

export default rootReducer;