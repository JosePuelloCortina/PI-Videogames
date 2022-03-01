import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import './styles/Form.css';
import { getAllGenres } from './actions';



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
    // if(!input.genres){
    //     errors.genres = 'Genres is required'
    // }

    return errors;
}

export default function Form(){
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const generos = useSelector((state)=> state.genres)
    

    const [ input, setInput] = useState({
        name: '',
        image: '',
        released: '',
        rating: '',
        description: '',
        platforms: '',
        genre:[]
    })

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        released: '',
        rating: '',
        description: '',
        platforms: '',
        genre:[]
        
        
    })

    function handleSelect(e){
        setInput({
            ...input,
            genre: [...input.genre, e.target.value]
        })
        setErrors(validate({
            ...input,
          [e.target.name]: e.target.value
        }));
        
    }
    useEffect(() => {
        dispatch(getAllGenres());
    }, [])
      

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
            navigate('/home')
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
                    <select onChange={handleSelect} name="genre" value={input.genre} >
                        <option >Genres</option>
                        {
                            generos.map((g) => (                            
                                <option value={g.id}>{g.name}</option>
                                ))
                        }                        
                    </select>
                    <ul className='listaGeneros'><li>{input.genre.map(el => el + " ,")}</li></ul> 
                    {
                        errors.genre && (<span className="danger">{errors.genre}</span>)
                    }
                    
                    
                </div>
                <input type='submit' disabled={errors.name || errors.image || errors.released || errors.rating || errors.description || errors.platforms || errors.genre? true : false}/>
                 
            </form>
        </div>
    )
}