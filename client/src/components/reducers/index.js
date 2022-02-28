import { CREATE_VIDEOGAMES, FILTER_BY_GENRES, GET_ALL_GENRES, GET_ALL_VIDEOGAMES, GET_DETAIL, GET_SEARCH_VIDEOGAMES, SORT, FILTER_RATING } from '../actions/index';
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
                filters: action.payload
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
        case FILTER_BY_GENRES: 
            const videogames = state.videogames;
            const genFiltered = action.payload === 'All' ? videogames : videogames.filter(g => g.genres.find(f => f.slug === action.payload));
            return{ 
                ...state,
                filters: genFiltered
            }
        // case FILTER_BACK:
        case FILTER_RATING: 
            const stateRating = state.videogames;
            const rango = action.payload === 'All' ? stateRating : stateRating.filter(r => r.rating <= action.payload && r.rating >= (action.payload - 1))
            return{
                ...state,
                filters: rango
            }

        case CREATE_VIDEOGAMES:
            return{
                ...state,
                videogames: [...state.videogames, action.payload]
            }
        default: return state;
    }
}

export default rootReducer;