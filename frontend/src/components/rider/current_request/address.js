import React from 'react';
import styles from './current_request.module.css'
const Address = ({request}) => {
    
      const type = request.requestType;
      const pickup = request.pickupLocationAddress;
      const drop = request.dropLocationAddress;
      const pCoordinates = request.pickupLocationCoordinates.coordinates;
      const dCoordinates = request.dropLocationCoordinates.coordinates;
      return (
        <div className={styles.addressContainer}>
         
          {type === "GENERAL" ? (
            <div className={styles.address}>
              <span>Address</span>
              {drop.address ? (
                <>
                  <span>{drop.address}</span>
                  <span>
                    {drop.city} {drop.area}
                  </span>
                 
                </>
              ) : (
                <a
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${dCoordinates[0]},${dCoordinates[1]}`}
                  target="_blank"
                >
                  Open in google maps
                </a>
              )}
            </div>
          ) : (
            <>
              
              <>
                <span>Pickup Location</span>
                <div className={styles.address}>
                  <span>Address</span>
                  {pickup.address ? (
                    <>
                      <span>{pickup.address}</span>
                      <span>
                        {pickup.city} {pickup.area}
                      </span>
                    
                  
                    </>
                  ) : (
                    <a
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${pCoordinates[0]},${pCoordinates[1]}`}
                      target="_blank"
                    >
                      Open in google maps
                    </a>
                  )}
                </div>
              </>
               
              <>
                <span>Drop Location</span>
                <div className={styles.address}>
                  <span>Address</span>
                  {drop ? (
                    <>
                      <span>{drop.address}</span>
                      <span>
                        {drop.city} {drop.area}
                      </span>
                    
                    </>
                  ) : (
                    <a
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${dCoordinates[0]},${dCoordinates[1]}`}
                      target="_blank"
                    >
                      Open in google maps
                    </a>
                  )}
                </div>
              </>
              
            </>
          )}
        </div>)
}
 
export default Address;