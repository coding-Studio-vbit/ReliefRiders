import React, { useContext, useEffect, useState } from "react";
import MyRequestsListItem from "./MyRequestsListItem";
import styles from "./MyRequests.module.css";
import Navbar from "../../global_ui/nav";
import axios from "axios";
import {Dialog} from "../../global_ui/dialog/dialog";
import { useSessionStorageState } from "../../../utils/useLocalStorageState";
import { AuthContext } from "../../context/auth/authProvider";
import { LoadingScreen } from "../../global_ui/spinner";
import {  useHistory } from "react-router-dom";

const MyRequests = () => {
  const history = useHistory()
  const [allRequests, setRequests] = useSessionStorageState("my_requests", []);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    console.log(token);
    
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    /* eslint-disable no-undef */

    axios.get(`${process.env.REACT_APP_URL}/requester/myRequests`, options).then(
      (response) => {
        //Tempo
        if(response.data.message.length === 0){
          setRequests([request])
        }
        else
        setRequests(response.data.message);

        console.log(response.data);
        
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  }, []);

  //sample
  
  

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
        
       <Dialog
        isShowing={error}
        onOK={() => {
          history.goBack()
        }}
        msg={error}
      />
      <Navbar
        back='/'
        backStyle={{ color: "white" }}
        title="My Requests"
        titleStyle={{ color: "white" }}
        style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}
      />
      {
        allRequests.length === 0 ? (

          <h3 className={styles.noRequests}> You haven&apos;t made any requests</h3>
        ) : 
        (
          <div className={styles.myRequestsList}>
            {allRequests.map((req) => {
              return <MyRequestsListItem  key={req.requestNumber} data={req} />
            })}
           
               
          </div>
        )
      }
    </>
  );
}

export default MyRequests;


const request = {
  requestNumber:"8628290",
  requesterID: "8628290",
  requestStatus: "PENDING",
  requestType: "P&D",
  itemsListImages: [
    // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  riderID:{
    name:"Someone"
  },
  itemsListList: [
    {
      itemName: "Tomato",
      quantity: "2kg",
    },
    {
      itemName: "Tomato",
      quantity: "2kg",
    },
  ],
  itemCategories: ["MEDICINES", "MISC"],
  remarks: "Something here",
  billsImageList: [
    // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  rideImages: [
    // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ],
  pickupLocationAddress: 
  {
    addressLine: "Some place far away",
    area: "",
    city: "Unknown",
    pincode: "XXXXXX",
  }
  ,
  dropLocationAddress: null
  // {
  //   addressLine: "Some place far away",
  //   area: "",
  //   city: "Unknown",
  //   pincode: "XXXXXX",
  // }
  ,

  pickupLocationCoordinates:{
    coordinates:[17.9,78.6]
  },
  dropLocationCoordinates:{
    coordinates:[17.9,78.6]
  }
}
