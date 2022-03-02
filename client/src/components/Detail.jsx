import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { getDetail, limpiarDetail } from './actions';
import './styles/Detail.css';


export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail)
    

    

    useEffect(() =>{
        dispatch(getDetail(id))
        return () => {dispatch(limpiarDetail())}
    }, [dispatch, id])

    
       

    return(
        <div>
            <div>
                {
                    detail.name?
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
                                detail.genres.map((g) =>  <p>{g.slug}</p>)
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