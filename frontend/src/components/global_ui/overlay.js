import React from 'react'

function Overlay({message,display,z_index,showOverlay}) {
    return (
        <div className="overlay" style={{ display:`${display}`,zIndex:`${z_index}`}}>
            <div className="overlay-content">  
                {/* Shows Dynamic Content for cancelling and confirmation */}
                <p>
                   {
                       message
                   }
                </p>  
                     
                {/* Buttons Performing Operations */}
                <span className="btn-container">
                    <button className="btn" onClick={()=>showOverlay}>OK</button>
                </span>
            </div>              
        </div>
    )
}

export default Overlay
