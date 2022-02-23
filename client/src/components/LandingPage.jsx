import React from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css'



function LandingPage(){
    return(
        <div className="div">
            {/* <h1 className="h1">PI - Videogames</h1> */}
            <Link to='/home' className='Link'>
                <button className="button"> <span> START </span></button>
            </Link> 
        </div>
    )
}

export default LandingPage;