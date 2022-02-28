import React from 'react'; 
import { Link } from 'react-router-dom';
import './styles/Card.css';
export default function Card({id, image, name, genres}){
    return(
        <div className='card'>  
             <Link to={`/home/${id}`}>               
                <img className='image' src={image} alt=""  ></img>
             </Link>
             <h2 className='h2'>{name}</h2>
             {genres.map((g) => {
                 return (
                     <a className='name'>{g} </a>
                 )
             })}
             

        </div>
    )
}