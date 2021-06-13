import React from 'react';
import { useLocation } from 'react-router';

const Request = () => {

    // const {state:{request}} = useLocation()
    const request = {
        requesterID:"8628290",
        requestStatus:"PENDING",
        requestType:"P&D",
        itemsListImages:[
            "imageshere"
        ],
        itemsListList:[
            {
                itemName:"Tomato",
                quantity:"2kg"
            }
        ],
        itemCategories:[
            
                "MEDICINES",
                "MISC"
            
        ],
        remarks: "Something here",
        billsImageList:["imageshere"],
        rideImages:["imgs"],
        pickupLocationAddress:{
            addressLine:"",
            area:"",
            city:"",
            pincode:""

        },
        dropLocationAddress:{
            addressLine:"",
            area:"",
            city:"",
            pincode:""

        },
    }
    //quantity 
    //itemsListType
    
    return ( 
        <div>

        </div>
    )
}
 
export default Request;