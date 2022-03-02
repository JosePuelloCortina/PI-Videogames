import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        platforms: [],
        genre:[]
    })

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        released: '',
        rating: '',
        description: '',
        platforms: [],
        genre:[]
        
        
    })

    function handleSelect(e){
        if(input.genre.includes(e.target.value)){
            setInput({
                ...input,
                genre: input.genre.filter(ge => ge !== e.target.value)
            })
        }else{
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
          [e.target.name]: e.target.value
        }));
        
    }

    function handleSelectPlat(e){
        if(input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms: input.platforms.filter(pla => pla !== e.target.value)
            })
        }else{
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
          [e.target.name]: e.target.value
        }));
        
    }
    useEffect(() => {
        dispatch(getAllGenres());
    }, [dispatch])
      

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
                    <label>Released: </label>
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
                    <select onChange={handleSelectPlat} name="platforms" value={input.platforms} className={errors.platforms && 'danger'}>
                        <option >Plataformas</option>
                        <option value="xbox">Xbox</option>
                        <option value="xbox-360">Xbox 360</option>
                        <option value="xbox-one">Xbox One</option>
                        <option value="playstation-2">Playstation 2</option>
                        <option value="playstation-3">Playstation 3</option>
                        <option value="playstation-4">Playstation 4</option>
                        <option value="playstation-5">Playstation 5</option>
                        <option value="pc">Pc</option>
                        <option value="linux">Linux</option>
                    </select>
                    <p>{input.platforms.map(el => el + " ,")}</p>
                    {
                        errors.platforms && (<span className="danger">{errors.platforms}</span>)
                    }                        
                </div>
                <div>            
                    <label>Genres: </label>
                    <select onChange={handleSelect} name="genre" value={input.genre} className={errors.genre && 'danger'} >
                        <option >Genres</option>
                        {
                            generos.length && generos.map((g, i) => (                            
                                <option key={g.id} value={g.name}>{g.name}</option>
                                ))
                        }                        
                    </select>
                    <p>{input.genre.map(el => el + " ,")}</p>
                    {
                        errors.genre && (<span className="danger">{errors.genre}</span>)
                    }
                    
                    
                </div>
                <input type='submit' disabled={errors.name || errors.image || errors.released || errors.rating || errors.description || errors.platforms || errors.genre ? true : false}/>
                 
            </form>
        </div>
    )
}