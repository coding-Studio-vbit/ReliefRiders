import React from 'react';
import styles from './current_request.module.css'

const Address = ({request}) => {    
    const type = request.requestType;
    const pickup = request.pickupLocationAddress;
    const drop = request.dropLocationAddress;
      return (
        <div className={styles.addressContainer}>         
          {
            type === "GENERAL" ? (
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
                <div>
                  {
                    request.dropLocationCoordinates!=undefined &&
                    <a
                    rel="noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${request.dropLocationCoordinates[0]},${request.dropLocationCoordinates[1]}`}
                    target="_blank"
                    >
                    Open in google maps
                    </a>
                  }                
                </div>
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
                    <div>
                      {
                        request.pickupLocationCoordinates!=undefined &&
                        <a
                          rel="noreferrer"
                          href={`https://www.google.com/maps/search/?api=1&query=${request.pickupLocationCoordinates[0]},${request.pickupLocationCoordinates[1]}`}
                          target="_blank"
                        >
                          Open in google maps
                        </a>
                      }                
                    </div>                    
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
                    <div>
                      {
                        request.dropLocationCoordinates!=undefined &&
                        <a
                      rel="noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${request.dropLocationCoordinates[0]},${request.dropLocationCoordinates[1]}`}
                      target="_blank"
                    >
                      Open in google maps
                    </a>
                      }                
                    </div>                  
                  )}
                </div>
              </>
              
            </>
          )}
        </div>)
}
 
export default Address;