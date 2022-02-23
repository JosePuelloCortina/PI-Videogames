import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchVideogames } from './actions';
import { NavLink } from 'react-router-dom';
import './styles/Nav.css';


export default function Nav({id}){
    const [ input, setInput] = useState("");
    const dispatch = useDispatch();

    function onSubmit(e){
        e.preventDefault();
        dispatch(getSearchVideogames(input))
    }

    function onInputChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    return(

        <div className="nav">
            <NavLink exact to='/home' className="enlace" >
                <h3>Home</h3>
            </NavLink>
            <NavLink exact to='/create' className="enlace" >
                <h3>Crear Videogame</h3>
            </NavLink>
            <div className="box">
                <input type="text" placeholder="Buscar Videogame" onChange={onInputChange} value={input} />
                <NavLink to={`/home/${id}`}>
                    <button onClick={onSubmit} >Search</button>
                </NavLink>
            </div>
        </div>
    )
}