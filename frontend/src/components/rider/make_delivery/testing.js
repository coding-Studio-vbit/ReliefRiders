import React from "react";
import "./chooseRequest.css";
import { useState } from "react";
import ChooseRequestItem from "./chooseRequestItem";

const Testing = () => {
  const [arr, setarr] = useState();
//function for sorting requests
  function sortedCustom(param){
     let a = requests;
    

    if (param == "comparisonByDate") {
      a.sort(comparisonByDate);
      setarr([a]);

      console.log("inside if date ");
      console.log(arr);
    } else if (param == "comparisonByPriority") {
      a.sort(comparisonByPriority);
      setarr([a]);

      console.log("inside if urgency");
      console.log(arr);
    }
  }

  
//function for sorting by date 
  function comparisonByDate(dateA, dateB) {
    var c = new Date(dateA.date);
    var d = new Date(dateB.date);
    return c - d;
  }

//function for sorting by urgency or priority 
  function comparisonByPriority(a, b) {
    return b.priority - a.priority;
  }

//write function for getting rider's current location and sorting accordingly by distance using roughLocationCoordinates

  return (
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
            <button onClick={() => sortedCustom("comparisonByDate")}>
              Date
            </button>
            <p>Location</p>
            <button onClick={() => sortedCustom("comparisonByPriority")}>
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
  );
};
export default Testing;
//hard coded an array of requests for testing 
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
    area: "SR Nagar",
    dropLocationAddress: {
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
    area: "SR NAGAR",
    dropLocationAddress: {
      addressLine: "6736BH",

      city: "Hyderabad",
    },
  },
  {
    date: "7/9/2031",
    requesterName: "Vanita",
    requestNumber: "2345",
    requesterID: "7777787",
    requestStatus: "PENDING",
    requestType: "General",
    roughLocationCoordinates: [78.44764026931458, 17.44209721721792],
    priority: "0",
    itemCategories: ["MEDICINES", "MISC"],
    area: "SR Nagar",
    dropLocationAddress: {
      addressLine: "6736BH",

      city: "Hyderabad",
    },
  },
];
