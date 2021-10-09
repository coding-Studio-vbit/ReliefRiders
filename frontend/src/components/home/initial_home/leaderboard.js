/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from 'react';
import {Spinner} from '../../global_ui/spinner';
import { fetchLeaderBoard } from './fetchLeaderBoard';
import './leaderboard.css'
export const LeaderBoard = () => {
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    useEffect(async()=>{
        const res = await fetchLeaderBoard()
        if(res.error){
            setError(res.error)
            return
        }
        if(res.status === 1 ){
            if(res.data.length === 0){
                setError("No top riders this week")
            }
            setData(res.data)
        }else{
            setError(res.data)
        }

        
    },[])
    
     if(data){
        return ( 
           <>
                <span className='leaderboard-title'  >This Week's Top Riders</span>
            {
                    error ? <p style={{fontSize:'1rem'}}  >{error}</p>:
                <div className="leaderboard-container">
                {
                    data.map((item,i)=><LeaderBoardUser key={i} position={++i} name={item.name} deliveryCount={item.numberOfDeliveriesCompleted} />)
                }
            </div>
            }
           </>
         );
    }else{
        return ( <Spinner radius="2"/> );
    }
    
}
 

const LeaderBoardUser = ({position,name,deliveryCount}) => {
    return ( 
        <div className="leaderboard-user">
            <div className="pn-space">
            <span  >#{position}</span>
            <i className="fas fa-user-circle"></i>

            
            <span  >
            
                {name}</span>
            </div>
            <div className="dc">
            <span>{deliveryCount} </span>
            <span>deliveries</span>
            </div>
        </div>
     );
}
 
