import React from 'react';
import {useHistory} from 'react-router-dom';
import './chooseRequest.css';

const ChooseRequestItem = (props) => {
    const routes = useHistory()
    return ( 
        <div onClick={()=>{
            routes.push("/make_delivery"+props.data.requestNumber,{
                request:props.data
            })
        }
         
        } className="chooseRequestItem">
            <span className="area"> <i className="fas fa-map-marker-alt"></i> {props.data.area}</span>
            <span className="requestType">props.data.requestType</span>
            {
                props.data.itemCategories.map((category, index) => {
                    switch (category) {
                        case 'MEDICINES': return <span key={index} className="medicines">Medicines</span>;
                        case 'GROCERIES': return <span key={index} className="groceries">Groceries</span>;
                        case 'MISC.': return <span key={index} className="misc">Misc.</span>;
                    }
                })
            }


        </div>
    )
}
export default ChooseRequestItem;


