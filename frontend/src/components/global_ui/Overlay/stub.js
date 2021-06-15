import React from 'react'
import './overlayStyles.css'
import { useState } from 'react';

import DeliveryStatus from './overlay';

function temp() {
    const cancel="cancel";
    const confirm="confirm";
    //since cancel and confirm are used frequently 

    // status flags fot overlay 
    // none indicates overlay not displayed
    // display indicates overlay display condition    
    const [showCancelOverlay, setShowCancelOverlay] = useState('none');
    //status flag for cancel overlay    
    const [showConfirmOverlay, setShowConfirmOverlay] = useState('none');
    //status flag for confirm overlay   
    
    const [showDialog,setDialog]=useState('none');

    const dialog_function=()=>{   
        console.log("Null ");   
        if(showDialog=='block')
        setDialog('none');
        else if(showDialog=='none')
        setDialog('block')
    }

    const showOverlay=(dialogType)=>{
        if(dialogType==cancel){
            if(showCancelOverlay=='block')
            setShowCancelOverlay('none');
            else if(showCancelOverlay=='none')
            setShowCancelOverlay('block')
        }
        else if(dialogType==confirm){
            if(showConfirmOverlay=='block')
            setShowConfirmOverlay('none');
            else if(showConfirmOverlay=='none')
            setShowConfirmOverlay('block')
        }
    }
    //showOverlay closes the dialog box as well as cancels the operation of cancelling or confirming 
    
    const deliveryOperation=(dialogType)=>{
        if(dialogType==cancel){                    
            setShowCancelOverlay('none');
            //perform API request to cancel the request            
        }
        else if(dialogType==confirm){            
            setShowConfirmOverlay('none');
            //perform API request to confirm the request
        }        
    }

    return (
        <div className="container"
        >
            <div style={{margin:'auto'}}>

            <button onClick={()=>showOverlay(cancel)}>Cancel Delivery</button>  
            <button onClick={()=>showOverlay(confirm)}>Confirm Delivery</button> 
            <button onClick={()=>dialog_function()}> Hell</button>

            </div>

            {/* <DeliveryStatus 
            display={showCancelOverlay} 
            showOverlay={showOverlay}
            type={cancel}
            z_index="1"
            deliveryOperation={deliveryOperation}
            /> */}

            <DeliveryStatus 
            dialogType="confirmation"
            message="Are you sure you want to confirm?"
            closeOverlay={ showOverlay}
            display={showConfirmOverlay} 
            type={confirm}
            z_index="2"
            operation={deliveryOperation}
            />  

            <DeliveryStatus 
            dialogType="error"
            message="Authentication Error"
            closeOverlay={ dialog_function}
            display={showDialog} 
            z_index="2"
            />  

               
        </div>
    )
}

export default temp;
