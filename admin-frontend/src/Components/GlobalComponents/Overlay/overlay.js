import React from 'react'
import './overlayStyles.css'

function Dialog({
    message,// message on dialog
    closeOverlay,
    type,// used for confirmation type : cancel or confirm
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
                    <button className="yes" onClick={()=>operation(type)}>YES</button>
                    <button className="no" onClick={()=>closeOverlay(type)}>NO</button>
                </span>      
            </div>              
        </div>
    )
}

export default Dialog;
