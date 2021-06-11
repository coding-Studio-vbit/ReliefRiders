import React from 'react'
import '../overlayStyles.css'

function DelivaryStatus({display,showOverlay,type,z_index,deliveryOperation}) {
    return (
        <div className="overlay" style={{ display:`${display}`,zIndex:`${z_index}`}}>
            <div className="overlay-content">  
                {/* Shows Dynamic Content for cancelling and confirmation */}
                <p>
                    { 
                        type=="confirm" &&
                        "Are you sure you want to confirm the delivery?"
                    }
                    { 
                        type=="cancel" &&
                        "Are you sure you want to cancel the delivery?"
                    }
                </p>  
                     
                {/* Buttons Performing Operations */}
                <span className="btn-container">
                    <button className="yes" onClick={()=>deliveryOperation(type)}>YES</button>
                    <button className="no" onClick={()=>showOverlay(type)}>NO</button>
                </span>
            </div>              
        </div>
    )
}

export default DelivaryStatus;
