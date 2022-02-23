import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import Card from './Card';
import './styles/Cards.css';

import { getAllVideogames, getAllGenres } from "./actions";

import Paginado from "./Paginado";

export default function Home(){

    const [state, setState] = useState("");
    // const[search, setSearch] = useState("")

    const dispatch = useDispatch();

    const allVideogames = useSelector((state) => state.filters);
    const allGenres = useSelector((state) => state.genres);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamePaginado, setVideogamePaginado] = useState(9);

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
    return(
        <div>
            <h1>Home</h1>
            <div className="cards row">
                
                {currentVideogame?.map(v => {
                    return(
                        <Card 
                        key = {v.id}
                        id = {v.id}
                        name = {v.name}
                        image = {v.image}
                        genres = {v.genres}                       
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