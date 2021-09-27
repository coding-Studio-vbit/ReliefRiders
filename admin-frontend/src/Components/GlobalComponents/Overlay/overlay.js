import React from 'react'
import './overlayStyles.css'

function Dialog({
    message,// message on dialog
    closeOverlay,
    display,//css prop
    operation//function to be performed on pressing yes
    }) {  
    return (
        <div className="overlay" style={{ display:`${display}`}}>
            <div className="overlay-content">
                <p className="message">
                {message}
                </p>  
                <span className="btn-container">
                    <button className="yes" onClick={()=>operation()}>YES</button>
                    <button className="no" onClick={()=>closeOverlay()}>NO</button>
                </span>      
            </div>              
        </div>
    )
}

export default Dialog;
