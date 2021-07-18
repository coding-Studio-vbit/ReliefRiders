import React from "react";
import "./chooseRequest.css";
import { LoadingScreen } from "../../global_ui/spinner";
import { Dialog } from "../../global_ui/dialog/dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import ChooseRequestItem from "./chooseRequestItem";
import { useHistory } from "react-router-dom";


const ChooseRequest = () => {
  const history = useHistory();
  const [arr, setarr] = useState(requests);
  const [error, setError] = useState(null);

  const [isLoaded, setisLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(async () => {
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    //add endpoint 
    axios.get("http://localhost:8000/rider/chooseRequest", options).then(
      (response) => {
        if (response.data.message.length===0){
          setarr([requests])
        }
        else 
        setarr(response.data.message);
        console.log(response.data);
        setisLoaded(true);
        setError(null);
      },
      (error) => {
       
        console.log(error);
        setError(error.toString());
        setisLoaded(true);
      }
    );
  }, []);
console.log(arr);
  function sortedCustom(param) {
    let a = requests;
    // a.sort(param);
    
    if (param == "comparisonByDate") {
      a.sort(comparisonByDate);
      setarr([a]);
      
      console.log(arr);
    } else if (param == "comparisonByPriority") {
      a.sort(comparisonByPriority);
      setarr([a]);
     
      console.log(arr);
    // } else if (param == "comparisonByDistance") {
    //   a.sort(comparisonByDistance());
    //   setarr([a]);
    // }
  }}
  function comparisonByDate(dateA, dateB) {
    var c = new Date(dateA.date);
    var d = new Date(dateB.date);
    return c - d;
  }

  //  console.log(requests.sort(comparisonByDate));

  function comparisonByPriority(a, b) {
    return b.priority - a.priority;
  }

  // console.log(requests.sort(comparisonByPriority));

   
  
  // function riderCurrentLocation() 
  // { 
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setCenterMaps({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //       setCoordinates({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //     });
  //     navigator.permissions.query({ name: "geolocation" }).then((res) => {
  //       if (res.state === "denied") {
  //         alert("Please allow location permission")
  //       }
  //     });
  //   }
  //   return [position.coords.longitude, position.coords.latitude]
  // }

  return isLoaded ? (
    error ? (
      <Dialog
        isShowing={error}
        onOK={() => {
          history.push("/rider/make_delivery");
          setError(false);
        }}
        msg={"Cannot load data"}
      />
    ) : (
      <div>
      <div className="navbar">
        <div className="backbtn">
          <i className="fas fa-chevron-left"></i>
        </div>
        <h3>Requests</h3>
        <div className="dropdown">
          <button className="dropbtn">
            Order By
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdownContent">
            <button onClick={()=>sortedCustom("comparisonByDate")}>Date</button>
            <p>Location</p>
            <button onClick={()=>sortedCustom("comparisonByPriority")}>
              Urgency
            </button>
          </div>
        </div>
      </div>
      {arr.length === 0 ? (
        <h3 className="noRequests">There are no new requests.</h3>
      ) : (
        <div className="wholeList">
          {arr.map((req) => {
            return <ChooseRequestItem key={req.requestNumber} data={req} />;
          })}
        </div>
      )}
    </div>
    )
  ) : (
    <LoadingScreen />
  );
};

export default ChooseRequest;
//hard coded requests array  for testing 
const requests = [
  {
    date: "7/7/2022",
    requesterName: "name",
    requestNumber: "12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "P&D",
    priority: "10",
    roughLocationCoordinates: [78.44764026931458, 17.44209721721792],
    itemCategories: ["GROCERIES", "MISC"],
    pickupArea: "Hyderabad",
    dropLocationAddress: {
      dropArea: "SR Nagar",
      addressLine: "6736BH",
   
      city: "Hyderabad",
    },
  },
  {
    date: "7/5/2021",
    requesterName: "Pranchal",
    covidStatus: "true",
    requestNumber: "1245",
    requesterID: "727777",
    requestStatus: "PENDING",
    requestType: "General",
    priority: "5",
    roughLocationCoordinates: [78.44764026931458, 17.44209721721792],
    itemCategories: ["GROCERIES", "MEDICINES", "MISC"],
    dropLocationAddress: {
      dropArea: "SR NAGAR",
      addressLine: "6736BH",
      
      city: "Hyderabad",
    },
  },
  {
    date: "7/9/2031",
    requesterName: "Vanita",
    requestNumber: "12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "General",
    roughLocationCoordinates: [78.44764026931458, 17.44209721721792],
    priority: "0",
    itemCategories: ["MEDICINES", "MISC"],
    dropLocationAddress: {
      dropArea: "SR Nagar",
      addressLine: "6736BH",
      
      city: "Hyderabad",
    },
  },
];

