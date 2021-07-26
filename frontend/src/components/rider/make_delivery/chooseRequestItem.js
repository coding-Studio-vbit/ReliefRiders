import React from "react";
// import {useState, useEffect} from "react";
import{useEffect} from "react";
import styles from "./ChooseRequest.module.css";

const ChooseRequestItem = (props) => {
  // const [data,setData]=useState(props.data);
  // componentWillReceiveProps=(props) => {
  //   setData({ data: props.data });
  // };
useEffect(() => {
  //  setData(props.data)
},[props])


  return (
    
    <div className={styles.container}
    key={props}>
   
   <div className={styles.chooseRequestItem}>
     
    
       {props.data.pickupArea && <span className={styles.pickupArea}>
       <i className="fas fa-map-marker-alt"></i>Pickup: {props.data.pickupArea}
     </span> }
     <span className={styles.area}>
       <i className="fas fa-map-marker-alt"></i>Drop: {props.data.area}
     </span>
     <span className={styles.requesterName}>
       Requester: {props.data.requesterName}
     </span>
     <span>{props.data.date}</span>
     <span>Priority: {props.data.priority}</span>
     {props.data.covidStatus && <span className={styles.covidStatus}>COVID+</span>}
     <span className={styles.requestType}>{props.data.requestType}</span>
     {props.data.itemCategories.map((category, index) => {
       switch (category) {
         case "MEDICINES":
           return (
             <span key={index} className={styles.medicines}>
               Medcines
             </span>
           );
           
         case "GROCERIES":
           return (
             <span key={index} className={styles.groceries}>
               Groceries
             </span>
           );
         case "MISC":
           return (
             <span key={index} className={styles.misc}>
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
