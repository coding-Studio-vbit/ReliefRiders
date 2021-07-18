import React from "react";

import "./chooseRequest.css";

const ChooseRequestItem = (props) => {

  return (
    <div className="container">
   <div className="chooseRequestItem">
     
    
       {props.data.pickupArea && <span className="pickupArea">
       <i className="fas fa-map-marker-alt"></i>Pickup: {props.data.pickupArea}
     </span> }
     <span className="area">
       <i className="fas fa-map-marker-alt"></i>Drop: {props.data.area}
     </span>
     <span className="requesterName">
       Requester: {props.data.requesterName}
     </span>
     {props.data.covidStatus && <span className="covidStatus">COVID+</span>}
     <span className="requestType">{props.data.requestType}</span>
     {props.data.itemCategories.map((category, index) => {
       switch (category) {
         case "MEDICINES":
           return (
             <span key={index} className="medicines">
               Medcines
             </span>
           );
           
         case "GROCERIES":
           return (
             <span key={index} className="groceries">
               Groceries
             </span>
           );
         case "MISC":
           return (
             <span key={index} className="misc">
               Misc.
             </span>
           );
           
         default:
           return null;
       }
     })}
     </div>
     
    
    </div> 
  ); 
}; 
export default ChooseRequestItem;
