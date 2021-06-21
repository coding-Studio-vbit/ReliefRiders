/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useEffect, useState } from 'react';
import {Spinner} from '../../global_ui/spinner';
import './leaderboard.css'
export const LeaderBoard = () => {
    const [data,setData] = useState([])

    useEffect(()=>{
        //fetch here
        //will add when leaderboard endpoint is done
        setData([
            {
                name:"Sai Kiran B",
                deliveryCount:10
            },
            {
                name:"Aaris Khan",
                deliveryCount:9
            },
            {
                name:"Prashanith",
                deliveryCount:2
            }

        ])
    },[])

    if(data){
        return ( 
           <Fragment>
                <span className='leaderboard-title'  >This Week's Top Riders</span>
            <div className="leaderboard-container">
                {
                    data.map((item,i)=><LeaderBoardUser key={i} position={++i} name={item.name} deliveryCount={item.deliveryCount} />)
                }
            </div>
           </Fragment>
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
 
