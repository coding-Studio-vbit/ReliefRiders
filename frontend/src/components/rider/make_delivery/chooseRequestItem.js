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
    return  parseFloat(data.distance)<=parseFloat(props.sliderValue) 
  }

  return (  
     compare() && (  
        <div className={styles.chooseRequestItem}> 
        {/* remove line 27 after testing */}
        {data.distance}
          <div className={styles.requesterName}>
            {data.requesterName}
          </div>       
          
          <div className={styles.location}>          
            {
              data.pickupLocationAddress &&  (
                <div className={styles.pickupArea}>
                  <i className="fas fa-map-marker-alt" style={{paddingRight:'5px'}}></i>Pickup :{" "}
                  {data.pickupLocationAddress.area}
                </div>
              )
            }
            <div className={styles.area}>
              <i className="fas fa-map-marker-alt" style={{paddingRight:'5px'}}></i>Drop :{" "}
              {data.dropLocationAddress.area}
            </div>
          </div>
        
          
          <div className={styles.status}>
            {props.data.requesterCovidStatus && (
              <div className={styles.covidStatus}>COVID+</div>
            )}

            <div className={styles.requestType}>{props.data.requestType}</div>
          </div>
        
          <div className={styles.category}>
          {props.data.itemCategories.map((category, index) => {
            switch (category) {
              case "MEDICINES":
                return (
                  <span key={index} className={styles.medicines}>
                    Medicines
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
          })
          }
          </div>
        </div>       
    )    
  );
};
export default ChooseRequestItem;
