import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import Card from './Card';
import './styles/Cards.css';

import { getAllVideogames, getAllGenres, filterByGenres, filterRating, filterBack } from "./actions";

import Paginado from "./Paginado";


export default function Home(){

    


    const dispatch = useDispatch();

    const allVideogames = useSelector((state) => state.filters);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamePaginado, setVideogamePaginado] = useState(15);

    const indexOfLastVideogame = currentPage * videogamePaginado;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamePaginado;
    const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    
    const showPaginas = (nVideogame) => {
        setCurrentPage(nVideogame);
    }

    useEffect(() =>{
        dispatch(getAllVideogames());
        dispatch(getAllGenres());
    }, [dispatch])

    

    function handleFilterGenre(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByGenres(e.target.value));
    }

    function handleFilterBack(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterBack(e.target.value));
    }

    function handleFilterRating(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRating(e.target.value));
    }

    
    return(
        <div>            
            <select onChange={handleFilterGenre}>
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


            <select onChange={handleFilterRating} >
                <option value="All">Rating</option>
                <option value="1">0 - 1</option>
                <option value="2">1 - 2</option>
                <option value="3">2 - 3</option>
                <option value="4">3 - 4</option>
                <option value="5">4 - 5</option>
            </select>

            <select onChange={handleFilterBack}>
                <option value="All">All</option>
                <option value="back">Creado</option>
                <option value="api">Existente</option>
            </select>

            
            <div className="cards row">
                

                
                {currentVideogame.length === 0 ? <p>No hay videogame </p> : currentVideogame?.map((v, index)=> {
                    return(
                        <Card 
                        key = {index}
                        id = {v.id}
                        name = {v.name}
                        image = {v.image}
                        genres = {v.genres.map(g => g.name)}                       
                        />
                    )
                })
                
                
                }
               
            </div>

            <Paginado
                videogamePaginado={videogamePaginado}
                allVideogames={allVideogames.length}
                showPaginas={showPaginas}

            />
        </div>
    )
}