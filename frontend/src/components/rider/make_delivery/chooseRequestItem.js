import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./ChooseRequest.module.css";

const ChooseRequestItem = (props) => {
  const [data, setData] = useState(props.data); 
  const history = useHistory(); 
  let flag = 0;

  useEffect(() => { 
    console.log(data);
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
    compare() && 
    
  
        <div className={styles.chooseRequestItem} 
        onClick={()=>history.push('/new_delivery/make',{reqObj:data})}
        > 
        {/* remove line 27 after testing */}
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
            {
              data.dropLocationAddress.address &&
              <div className={styles.area}>
                <i className="fas fa-map-marker-alt" style={{paddingRight:'5px'}}></i>Drop :{" "}
                {data.dropLocationAddress.area}
              </div>
            }
            {
              data.roughLocationCoordinates.coordinates[0] &&
              <div className={styles.area}>
                <i className="fas fa-map-marker-alt" style={{paddingRight:'5px'}}></i>{" "}
                <a href={
                  `https://www.google.com/maps/search/?api=1&query=${data.roughLocationCoordinates.coordinates[0]},${data.roughLocationCoordinates.coordinates[1]}`
                }
                >Location</a>
              </div>
            }            
          </div>
        
          
          <div className={styles.status}>
            {
              props.data.requesterCovidStatus && (
              <div className={styles.covidStatus}>COVID+</div>
              )
            }
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
  
};
export default ChooseRequestItem;
