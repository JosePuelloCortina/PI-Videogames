import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { getDetail } from './actions';
import './styles/Detail.css';
import { useState } from 'react';

export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();

    

    useEffect(() =>{
        dispatch(getDetail(id));
    }, [dispatch])

    const detail = useSelector(state => state.detail)
       

    return(
        <div>
            <div>
                {
                    detail != '' ?
                    <div className='detail' key={detail.id}>
                        

                        <div className="header">
                            <h2>{detail.name}</h2>
                        
                        <img src={detail.background_image || detail.image} alt="img not found" width="600px" /><br/>
                        <div dangerouslySetInnerHTML={{__html: detail.description}}></div>
                        <p>{detail.released}</p>
                        <p>{detail.rating}</p>
                        <p>{detail.platforms}</p>
                        {/* <div>
                            {detail.platforms.map((p) =>{
                                return(
                                    <p>{p.platforms}</p>
                                )
                            })}
                        </div>  */}
                        <div>
                            {
                                detail.genres.map((g) =>{
                                    return(
                                        <p>{g.name}</p>
                                    )
                                })
                            }
                        </div>
                        </div>

                        

                    </div>
                    :
                    <div> No trajo al videogame</div>
                    
                }
                
            </div>
            
        </div>
    )
}