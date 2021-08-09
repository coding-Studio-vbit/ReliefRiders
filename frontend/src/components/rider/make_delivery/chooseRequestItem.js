import React from "react";
import { useState, useEffect } from "react";
import styles from "./ChooseRequest.module.css";

const ChooseRequestItem = (props) => {
  const [data, setData] = useState(props.data);
  const [value2, setValue2] = useState(props.value);
  console.log(value2);
  let flag = 0;
  useEffect(() => {
    setValue2(props.value);

    setData(props.data);
    if (data) {
      flag = 1;
    }
    if (flag == 0) {
      console.log("noo data");
    }
  }, [props]);
function compare (){
  return  parseFloat(data.distance) <= parseFloat(props.value) 
}
  return (
  
     compare() &&  (
    <div className={styles.container} key={props}>
   
      <div className={styles.chooseRequestItem}>
        {data.date} {/*for testing */}
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
        {data.distance} {/*for testing */}
        <span className={styles.requesterName}>
          Requester: {props.data.requesterName}
        </span>
        <span>Priority: {props.data.priority}</span> {/*for testing */}
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
