import React, { useEffect, useState } from "react";
import ChooseRequestItem from "./chooseRequestItem";

import styles from "./ChooseRequest.module.css";
// import axios from "axios";
import { Dialog } from "../../global_ui/dialog/dialog";
// import { useSessionStorageState } from "../../../utils/useLocalStorageState";

import { LoadingScreen } from "../../global_ui/spinner";

// import { useHistory } from "react-router-dom";

const ChooseRequest = () => {
  

    const [value, setValue] = useState(1);
  

  
  // const history = useHistory();
  const [allRequests, setRequests] = useState(request);
  const [error, setError] = useState(null);
  const[flag,setFlag]=useState(0);
  //  const [coordinates, setCoordinates] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  function sortedCustom(param) {
    setFlag(flag+1);
    let a = request;

    if (param == "Date") {
      a.sort(comparisonByDate);
      setRequests(a);
    } else if (param == "Priority") {
      a.sort(comparisonByPriority);
      setRequests(a);
    }
    //  else if(param=="Distance"){
    //    a.sort(comparisonByDistance);
    //    setRequests(a);
    //  }
    console.log(11, allRequests);
  }
  // function success(pos)
  // {
  //   var crd = pos.coords;
  //   console.log([crd.latitude,crd.longitude]);
  //   return [crd.latitude,crd.longitude];
  // }
  // navigator.geolocation.getCurrentPosition(success);

  // function riderCurrentLocation()
  //   {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {

  //         setCoordinates({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       });
  //       navigator.permissions.query({ name: "geolocation" }).then((res) => {
  //         if (res.state === "denied") {
  //           alert("Please allow location permission")
  //         }
  //       });
  //     }
  //     return coordinates;
  //   }
  // function comparisonByDistance(posA) {
  // var c = posA.roughLocationCoordinates;
  // var d = riderCurrentLocation();
  // }

  //function for sorting by date
  function comparisonByDate(dateA, dateB) {
    var c = new Date(dateA.date);
    var d = new Date(dateB.date);
    return c - d;
  }
  //function for sorting by priority or urgency
  function comparisonByPriority(a, b) {
    return b.priority - a.priority;
  }
  // function calculateDistance(posA, posB) {
  //   axios
  //   .get(
  //     "https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin_lat+","+origin_lng}&destinations=side_of_road:${dest_lat+","+dest_lng}&key=AIzaSyAgP6rjcTRM4-fVcxfGdgCGaaU6fW7f5xQ"
  //   )
  //   .then((response) => {
  //     console.log(response.data);
      
  //     origin_lat = posA.lat;
  //     origin_lng = posA.lng;
  //     dest_lat = posB.lat;
  //     dest_lng = posB.lng;
  //   }, (error)=>{
  //     console.log(error);
  //   });
  // }
  // function something (){
  //   posA= riderCurrentLocation();
  //   posB = req.roughLocationCoordinates;
  // }

  useEffect(() => {
    console.log(token);
    // setRequests(request);
    setLoading(null);
   
    console.log("Pranchal");
   

    // const options = {
    //   headers: {
    //     authorization: "Bearer " + token,
    //   },
    // };
    /* eslint-disable no-undef */

    // axios.get(`${process.env.REACT_APP_URL}/rider/makeDelivery`, options).then(
    //   (response) => {
    //     //Tempo
    //     if (response.data.message.length === 0) {
    //       setRequests([request]);
    //     } else setRequests(response.data.message);

    //     console.log(response.data);

    //     setLoading(false);
    //   },
    //   (error) => {
    //     setError(error.message);
    //     setLoading(false);
    //   }
    // );
  }, []);

  //sample

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <Dialog
        isShowing={error}
        onOK={() => {
          // history.goBack();
          setError(null);
        }}
        msg={error}
      />
      <div className={styles.container}>
      
        <div className={styles.navbar}>
          <div className={styles.backbtn}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <h3 className={styles.title}>Requests</h3>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>
              Order By
              <i className="fa fa-caret-down"></i>
            </button>
            <div className={styles.dropdownContent}>
              <button className={styles.buttons} onClick={() => sortedCustom("Date")}>Date</button>
        
              <button className={styles.buttons} onClick={() => sortedCustom("Distance")}>Location</button>
             
              <button className={styles.buttons} onClick={() => sortedCustom("Priority")}>Urgency</button>
            </div>
          </div>
        </div>
        <div className={styles.rangeSlider}>
        Distance: 
            <input type="range" min="1" max="20" value={value} 
             onChange={({ target: { value: radius } }) => {
                    setValue(radius);
                  }}></input>
        </div>
          <div className={styles.bubble} id = "bubble">
           Upto {value} Kilometres
          </div>

        {allRequests.length === 0 ? (
          <h3 className={styles.noRequests}>There are no new Requests.</h3>
        ) : (
          <div className={styles.ChooseRequestItem}>
            {allRequests.map((req) => {
              return <ChooseRequestItem obj = {allRequests} key={req.requestNumber} data={req} />;
            })}
          </div>
        )}
       
      </div>
    </>
  );
};

export default ChooseRequest;

// const request = {
//   requestNumber: "8628290",
//   requesterID: "8628290",
//   requestStatus: "PENDING",
//   requestType: "P&D",
//   itemsListImages: [
//     // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//   ],
//   riderID: {
//     name: "Someone",
//   },
//   itemsListList: [
//     {
//       itemName: "Tomato",
//       quantity: "2kg",
//     },
//     {
//       itemName: "Tomato",
//       quantity: "2kg",
//     },
//   ],
//   itemCategories: ["MEDICINES", "MISC"],
//   remarks: "Something here",
//   billsImageList: [
//     // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//   ],
//   rideImages: [
//     // "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//   ],
//   pickupLocationAddress: {
//     addressLine: "Some place far away",
//     area: "",
//     city: "Unknown",
//     pincode: "XXXXXX",
//   },
//   dropLocationAddress: null,
//   // {
//   //   addressLine: "Some place far away",
//   //   area: "",
//   //   city: "Unknown",
//   //   pincode: "XXXXXX",
//   // }
//   pickupLocationCoordinates: {
//     coordinates: [17.9, 78.6],
//   },
//   dropLocationCoordinates: {
//     coordinates: [17.9, 78.6],
//   },
// };

const request = [
  {
    date: "7/7/2022",
    requesterName: "name",
    requestNumber: "12345",
    requesterID: "777777",
    requestStatus: "PENDING",
    requestType: "P&D",
    priority: "15",
    roughLocationCoordinates: [78.44764026931458, 17.44209721721792],
    itemCategories:["MEDICINES"],
    pickupArea: "Hyderabad",
    area: "SR Nagar",
    dropLocationAddress: {
      addressLine: "6736BH",

      city: "Hyderabad",
    },
  },
  {
    date: "7/7/2002",
    requesterName: "name",
    requestNumber: "945",
    requesterID: "72377",
    requestStatus: "PENDING",
    requestType: "P&D",
    priority: "12",
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
    itemCategories: [ "MISC"],
    area: "SR Nagar",
    dropLocationAddress: {
      addressLine: "6736BH",

      city: "Hyderabad",
    },
  },
];
