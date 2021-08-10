import React from "react";
import { useState, useEffect } from "react";
import styles from "./ChooseRequest.module.css";

const ChooseRequestItem = (props) => {
  const [data, setData] = useState(props.data);
  
  let flag = 0;
  useEffect(() => {
  

    setData(props.data);
    if (data) {
      flag = 1;
    }
    if (flag == 0) {
      console.log("noo data");
    }
  }, [props]);
function compare (){
  return  parseFloat(data.distance) <= parseFloat(props.sliderValue) 
}
  return (
  
     compare() &&  (
    <div className={styles.container} key={props}>
   
      <div className={styles.chooseRequestItem}>
       
        {data.pickupLocationAddress && props.data.pickupLocationAddress.area && (
          <span className={styles.pickupArea}>
            <i className="fas fa-map-marker-alt"></i>Pickup:{" "}
            {props.data.pickupLocationAddress.area}
          </span>
        )}
        <span className={styles.area}>
          <i className="fas fa-map-marker-alt"></i>Drop:{" "}
          {data.dropLocationAddress.area}
        </span>
      
        <span className={styles.requesterName}>
          Requester: {props.data.requesterName}
        </span>
       
        {props.data.requesterCovidStatus && (
          <span className={styles.covidStatus}>COVID+</span>
        )}
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
    )
    
  );
};
export default ChooseRequestItem;
