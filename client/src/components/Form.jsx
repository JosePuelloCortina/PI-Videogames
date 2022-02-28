import React, { useState } from 'react';
import { NavLink,  } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";

export function validate(input){
    // let history = useHistory()
    let errors = {};
    if(!input.name){
        errors.name = 'Name is required';
    }else if(!/\S+@\S+\.\S+/.test(input.name)){
        errors.name = 'Username is invalid';
    }
    return errors;
}

export default function Form(){
    const [errors, setErrors] = useState({
        name: 'Name is required'
    })

    const [ input, setInput] = useState({})
      

    function onInputChange(e)  {
        e.preventDefault()
        // setInput({
        //     ...input,
        //     [e.target.name]: e.target.value
        // })
        // setError(validate({
        //     ...input,
        //     [e.target.name]: e.target.value
        //   }));
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
            // history.pushState('/home')

        })
    }

    return(
        <div>
            <form onSubmit={onSubmit}> 
                <label htmlFor=""> Name: </label> 
                <input type="text" name="name" value={input.name} onChange={onInputChange}
                 className={errors.name && 'danger'} />
                     
                <br/>
                <label htmlFor="" >Image: </label>
                <input type="text" name="image" value={input.image} onChange={onInputChange}/><br/>
                <label htmlFor="">released: </label>
                <input type="text" name="released" value={input.released} onChange={onInputChange}/><br/>
                <label htmlFor="">rating: </label>
                <input type="text" name="rating" value={input.rating} onChange={onInputChange}/><br/>
                <label htmlFor="">description: </label>
                <input type="text" name="description" value={input.description} onChange={onInputChange}/><br/>
                <label htmlFor="">Platforms: </label>
                <input type="text" name="platforms" value={input.platforms} onChange={onInputChange}/><br/>
                <label htmlFor=''>Genres: </label><br/>
                <select onChange={onInputChange} name='genre' multiple={true} value={input.genres}>
                    {/* {
                        genres.length && genres.map((g) => <option name={g.id} value={g.id}> {g.name} </option>)
                    } */}
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
                </select><br/>
                <input type='submit'/>
                 
            </form>
        </div>
    )
}