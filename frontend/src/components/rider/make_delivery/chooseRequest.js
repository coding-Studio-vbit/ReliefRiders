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
  const [requests, setRequests] = useState({});
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
    axios.get("http://localhost:8000/rider/endpoint", options).then(
      (response) => {
        setRequests(response.data.message);
        console.log(response.data);
        setisLoaded(true);
        setError(null);
      },
      (error) => {
        console.log("An error occured", error);
        console.log(error);
        setError(error.toString());
        setisLoaded(true);
      }
    );
  }, []);

  function sortByDate(dateA, dateB) {
    var c = new Date(dateA.date);
    var d = new Date(dateB.date);
    return c - d;
  }
  requests.sort(sortByDate);
  console.log(requests.sort(sortByDate));

  function sortByUrgency(a,b){
    return a.priority - b.priority;
}
requests.sort(sortByUrgency);
console.log(requests.sort(sortByUrgency));
function sortByLocation(a,b){
  
}
   
  
  function riderCurrentLocation() 
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenterMaps({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "denied") {
          alert("Please allow location permission")
        }
      });
    }
    return [position.coords.longitude, position.coords.latitude]
  }

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
              <p>Date</p>
              <p>Location</p>
              <p>Urgency</p>
            </div>
          </div>
        </div>
        {requests.length === 0 ? (
          <h3 className="noRequests"> There are no new requests</h3>
        ) : (
          <div className="wholeList">
            {requests.map((req) => {
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

let requests = [{
  date: "7/7/2001",
  requestNumber: "12345",
  requesterID: "777777",
  requestStatus: "PENDING",
  requestType: "General",

  itemCategories: ["MEDICINES", "MISC"],

  dropLocationAddress: {
    addressLine: "6736BH",
    area: "SR Nagar",
    city: "Hyderabad",
  }},{
    date: "7/9/2031",
    requestNumber: "12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "General",

    itemCategories: ["MEDICINES", "MISC"],

    dropLocationAddress: {
      addressLine: "6736BH",
      area: "SR Nagar",
      city: "Hyderabad",
    }}]
