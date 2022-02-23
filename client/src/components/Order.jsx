import { useDispatch } from "react-redux"
import { ASCENDENTES, DESCENDENTES } from "./constantes/sort"
import { sort } from "./actions" 

export default function Order(){

    const dispatch = useDispatch()

    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    
    return(
        <select name="select" onChange={onSelectChange}>
            <option value={ASCENDENTES}>ascendente</option>
            <option value={DESCENDENTES}>descendente</option>
        </select>
    )
}