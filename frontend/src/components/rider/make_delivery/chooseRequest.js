import React from "react";
import  {styles} from "./chooseRequest.module.css";
import {LoadingScreen} from '../../global_ui/spinner';
import Dialog from '../../global_ui/dialog/dialog';
import {useState,useEffect} from 'react';
import axios from 'axios';
import ChooseRequestItem from "./chooseRequestItem";

const ChooseRequest=()=> {
    const[isLoaded, setisLoaded]=useState(false);
    const [error, setError] = useState(null);
     const token = localStorage.getItem('token')
     const [data, setData]=useState("make_delivery",[]);
    

    useEffect(
        async () => {
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/rider/make_delivery',options)
            .then(response => {
                if(response.data.message.lenght===0){
                    setData([Generalrequest])
                }
                else{
                setData(response.data.message);
                setisLoaded(true);
                setError(null)
                }
            }, error => {
                console.log("An error occured", error);
                setError(error.toString());
                setisLoaded(true);
            })
    }, [])

   
    return ( isLoaded ? (
        
      error ?
      <Dialog
            isShowing={error} 
            onOK={() => {
                history.push("/rider/make_delivery") 
                setError(false)
            }} 
            msg={"Cannot load data"} />
       : 
          <div>
        <div className={styles.navbar}>
            <div className="backbtn">
  <i  className="fas fa-chevron-left"></i>

            </div>
<h3>Requests</h3>
  <div className={styles.dropdown}>
    <button className="dropbtn">Order By
      <i className="fa fa-caret-down"></i>
    </button>
    <div className={styles.dropdownContent}>
     <p>order 1</p>
     <p>order 2</p>
     <p>order 3</p>
    </div>
  </div>
</div> 
{
    data.length=== 0 ? (
        <h3 className={styles.noRequests}>There are no requests!</h3>
    ) : (

<div className={styles.wholeList}>
            {data.map((req)=>{
                return <ChooseRequestItem key={req.requestNumber}
                data={req} />
            })}
</div>
    )
}
</div>
 
        
    )
    : <LoadingScreen/>
    )

    
};
export default ChooseRequest;



//dummy function

const Generalrequest = {
    requestNumber:"12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "General",
    riderID:{
      name:"Someone"
    },
    itemsListList: [
      {
        itemName: "Dolo 650",
        quantity: "2 strips",
      },
      {
        itemName: "Syrup",
        quantity: "1 bottle",
      },
    ],
    itemCategories: ["MEDICINES", "MISC"],
    remarks: "Green cap Syrup",
    dropLocationAddress: {
      addressLine: "6736BH",
      area: "SR Nagar",
      city: "Hyderabad",
      
    }
  }