import { useDispatch } from "react-redux"
import { filterByGenres } from "./actions";

export default function Filtrado(){
    const dispatch = useDispatch()
    
    function handleFilterGenre(e){
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
    }
    return(
        <select onChange={ e => handleFilterGenre(e)}>
            <option value='All'>Generos</option>
            <option value="action">action</option>
            <option value="indie">indie</option>
            <option value="adventure">adventure</option>
            <option value="role-playing-games-rpg">role-playing-games-rpg</option>
            <option value="strategy">strategy</option>
            <option value="shooter">shooter</option>
            <option value="casual">casual</option>
            <option value="simulation">simulation</option>
            <option value="puzzle">puzzle</option>
            <option value="arcade">arcade</option>
            <option value="platformer">platformer</option>
            <option value="racing">racing</option>
            <option value="massively-multiplayer">massively-multiplayer</option>
            <option value="sports">sports</option>
            <option value="fighting">fighting</option>
            <option value="family">family</option>
            <option value="board-games">board-games</option>
            <option value="educational">educational</option>
            <option value="card">card</option>
        </select>
    )

}
