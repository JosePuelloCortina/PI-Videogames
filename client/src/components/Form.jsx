import React, { useState } from 'react';
import { NavLink,  } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './styles/Form.css';


export function validate(input){
    
    let errors = {};
    if(!input.name){
        errors.name = 'Name is required';
    }
    // else if(!/\S+@\S+\.\S+/.test(input.name)){
    //     errors.name = 'Username is invalid';
    // }
    if(!input.image){
        errors.image = 'Image is required'
    }
    if(!input.released){
        errors.released = 'Released is required'
    }
    if(!input.rating){
        errors.rating = 'Rating is required'
    }
    if(!input.description){
        errors.description = 'Description is required'
    }
    if(!input.platforms){
        errors.platforms = 'Platforms is required'
    }
    if(!input.genres){
        errors.genres = 'Genres is required'
    }

    return errors;
}

export default function Form(){
    

    const [ input, setInput] = useState({
        
        
    })

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        released: '',
        rating: '',
        description: '',
        platforms: '',
        genres: ''
        
    })
      

    function onInputChange(e)  {
        e.preventDefault()
        setInput((input) =>{
            setErrors(validate({
                ...input,
              [e.target.name]: e.target.value
            }));
            return {
                ...input,
              [e.target.name]: e.target.value
            }

        })
    }


    function onSubmit(e){
        console.log(input)
        e.preventDefault()
        axios.post('http://localhost:3001/videogames/add', input)
        .then(() =>{
            alert("Se creo la Videogame");
        // recargar la pagina 
        })
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div>                    
                    <label> Name: </label> 
                    <input 
                        type="text" 
                        name="name"
                        value={input.name}
                        onChange={onInputChange}
                        className={errors.name && 'danger'}
                    />
                    {
                        errors.name && (<span className="danger">{errors.name}</span>)
                    }  
                </div>
                <div>                    
                    <label> Url Imagen: </label>
                    <input 
                        type="text" 
                        name="image" 
                        value={input.image} 
                        onChange={onInputChange}
                        className={errors.image && 'danger'}
                    />
                    {
                        errors.image && (<span className="danger">{errors.image}</span>)
                    }
                </div> 
                <div>
                    <label>released: </label>
                    <input 
                        type="date" 
                        name="released" 
                        value={input.released} 
                        onChange={onInputChange}
                        className={errors.released && 'danger'}
                    />
                    {
                        errors.released && (<span className="danger">{errors.released}</span>)
                    }
                </div>
                <div>
                    <label>Rating: </label>
                    <input 
                        type="number" 
                        name="rating" 
                        min="0" 
                        max='5' 
                        value={input.rating} 
                        onChange={onInputChange}
                        className={errors.rating && 'danger'}
                    />
                    {
                        errors.rating && (<span className="danger">{errors.rating}</span>)
                    }
                </div>
                <div>
                    <label>Description: </label>
                    <input 
                        type="text" 
                        name="description" 
                        value={input.description} 
                        onChange={onInputChange}
                        className={errors.description && 'danger'}
                    />
                    {
                        errors.description && (<span className="danger">{errors.description}</span>)
                    }
                </div>
                <div>
                    <label>Platforms: </label>
                    <input 
                        type="text" 
                        name="platforms" 
                        value={input.platforms} 
                        onChange={onInputChange}
                        className={errors.platforms && "danger"}
                    />
                    {
                        errors.platforms && (<span className="danger">{errors.platforms}</span>)
                    }                        
                </div>
                <div>            
                    <label>Genres: </label><br/>
                    <select onChange={onInputChange} name="genre" value={input.genres} className={errors.genres && "danger"}  >
                        <option>Genres</option>
                        <option value="1">action</option>
                        <option value="2">indie</option>
                        <option value="3">adventure</option>
                        <option value="4">role-playing-games-rpg</option>
                        <option value="5">strategy</option>
                        <option value="6">shooter</option>
                        <option value="7">casual</option>
                        <option value="8">simulation</option>
                        <option value="9">puzzle</option>
                        <option value="10">arcade</option>
                        <option value="11">platformer</option>
                        <option value="12">racing</option>
                        <option value="13-multiplayer">massively-multiplayer</option>
                        <option value="14">sports</option>
                        <option value="15">fighting</option>
                        <option value="16">family</option>
                        <option value="17">board-games</option>
                        <option value="18">educational</option>
                        <option value="19">card</option>
                        
                    </select>
                    {
                        errors.genres && (<span className="danger">{errors.genres}</span>)
                    }
                    
                    
                </div>
                <input type='submit' disabled={errors.name || errors.image || errors.released || errors.rating || errors.description || errors.platforms || errors.genres ? true : false}/>
                 
            </form>
        </div>
    )
}