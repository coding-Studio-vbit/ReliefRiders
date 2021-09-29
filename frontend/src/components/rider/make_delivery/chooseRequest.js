import React, { useEffect, useState } from "react";
import ChooseRequestItem from "./chooseRequestItem";
import styles from "./ChooseRequest.module.css";
import axios from "axios";
import { Dialog } from "../../global_ui/dialog/dialog";
import { LoadingScreen } from "../../global_ui/spinner";
import { useHistory } from "react-router";

export const ChooseRequest = () => {
  const [sliderValue, setSliderValue] = useState(1000);
  const [allRequests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(0);

  const [coordinates,setCoordinates] = useState({lat:null,lng:null})

  const token = localStorage.getItem("token");
  const history=useHistory()
  //sorting requests based on 3 parameters.
  function sortedCustom(param) {
    setFlag(flag + 1);
    let a = allRequests;
    if (param == "Date") {
      a.sort(comparisonByDate);
      setRequests(a);
    } else if (param == "Priority") {
      a.sort(comparisonByPriority);
      setRequests(a);
    } else if (param == "Distance") {
      if (coords) {
        a.sort(comparisonByDistance);
      }
      setRequests(a);
    }
  }

  function comparisonByDistance(a, b) {
    return a.distance - b.distance;
  }
  //Comparison function for sorting by date
  function comparisonByDate(dateA, dateB) {
    var c = new Date(dateA.date);
    var d = new Date(dateB.date);
    return c - d;
  }
  //Comparison function for sorting by priority or urgency
  function comparisonByPriority(a, b) {
    return b.priority - a.priority;
  }

 

  //finding current location of rider
  const currentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          setCoordinates({        
            lat:position.coords.latitude,
            lng:position.coords.longitude
          })
        },
        (err)=>{
          console.log(err);
          setError("Location Permission Denied");
        });
        navigator.permissions.query({ name: "geolocation" }).then((res) => {
          if (res.state === "denied") {
            console.log("Location Permission denied");
            alert("Please allow location permission");
          }
        });
      }
    };

  //Calculating distance between rider's current location and roughLocationCoordinates using google maps api
  function calculateDistance(i) {
    console.log(`Calculating Distance ${i+1}`);
    let distance;
    let URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${coordinates.lat},${coordinates.lng}&destinations=${allRequests[i].roughLocationCoordinates[0]},${allRequests[i].roughLocationCoordinates[1]}&key=${process.env.REACT_APP_GMAP_API_KEY}`;
    axios.get(URL)
      .then((response) => {
        distance = response.data.rows[0].elements[0].distance.value;
        let temp = allRequests;
        temp[i].distance = distance / 1000;
        console.log(distance[i]);
        setRequests(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //calling calculate distance function for each request
  function assignDistance() {
    console.log("Assigning Distance");
    const temp = allRequests.length;
    console.log(temp,allRequests);
    for (var i = 0; i < temp; i++) {
      calculateDistance(i);    
    }
    console.log("Distance Assigned");
  }

  useEffect(() => {
    currentLocation();
 
  }, [])

  useEffect(() => {
    setLoading(true);    
    const options = {
      headers: {
        authorization: "Bearer " + token,
      },      
    };
    
    if(coordinates.lat && coordinates.lng){ 
      axios
      .post(`${process.env.REACT_APP_URL}/rider/showFetchedRequests`,{        
          latitude:coordinates.lat,
          longitude:coordinates.lng,
          maxDistance:sliderValue        
      }, options)
      .then((response) => {
        console.log(response,20);
        if (response.data.message.length === 0) {
          setLoading(false);
          setError("Could not fetch Data");
        } 
        else {
          console.log(response);
          let data = response.data.message;
          for (let i = 0; i < data.length; i++) {
            data[i].distance = -1;
          }
          setRequests(data);
          assignDistance();
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
    }
    else{
      setLoading(false)
    }
  }, [coordinates,sliderValue]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <Dialog
        isShowing={error}
        onOK={() => {
          console.log(history);
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
              <i
                className="fa fa-caret-down"
                style={{ paddingLeft: "2px" }}
              ></i>
            </button>

            <div className={styles.dropdownContent}>
              <p className={styles.btnhead} onClick={() => null}>
                Order By
              </p>
              <button
                className={styles.buttons}
                onClick={() => sortedCustom("Date")}
              >
                Date
              </button>

              <button
                className={styles.buttons}
                onClick={() => sortedCustom("Distance")}
              >
                Location
              </button>

              <button
                className={styles.buttons}
                onClick={() => sortedCustom("Priority")}
              >
                Urgency
              </button>
            </div>
          </div>
        </div>

        <div className={styles.rangeSlider}>
          Distance
          <input
            className={styles.slider}
            type="range"
            min="1"
            max="100"
            value={sliderValue}
            onChange={({ target: { value: radius } }) => {
              setSliderValue(parseInt(radius));
            }}
          />
        </div>

        <div className={styles.bubble} id="bubble">
          Upto {sliderValue} Kilometres
        </div>

        {
          allRequests.length === 0 ? 
          <h3 className={styles.noRequests}>There are no new Requests.</h3>:           
          <div>
            {allRequests.map((req, i) => {
              return (
                <ChooseRequestItem
                  sliderValue={sliderValue}
                  key={i}
                  data={req}
                />
              );
            })}
          </div>
        }
      </div>
    </>
  );
};

export default ChooseRequest;

// const request = [
//   {
//     date: "7/7/2022",
//     requestNumber: "12345",
//     requesterID: "777777",
//     riderID: "5678",
//     noContactDelivery: "true",
//     requestStatus: "PENDING",
//     requestType: "P&D",
//     itemCategories: ["MEDICINES"],
//     remarks: "Use back gate",
//     billsImageList: ["some link"],
//     rideImages: ["some link"],
//     roughLocationCoordinates: [17.449009453401768, 78.39147383021886],
//     pickupLocationCoordinates: {
//       coordinates: [37.7680296, -122.4375126],
//     },
//     pickupLocationAddress: {
//       address: "12-4-126/7",
//       area: "SR Nagar",
//       city: "Hyderabad",
//     },
//     dropLocationCoordinates: {
//       coordinates: [37.7680296, -122.4375126],
//     },
//     dropLocationAddress: {
//       addressLine: "6736BH",
//       area: "SR Nagar",
//       city: "Hyderabad",
//     },
//     priority: "15",
//     requesterName: "Pranchal Agarwal",
//   },
//   {
//     date: "7/7/2002",
//     requestNumber: "945",
//     requesterID: "72377",
//     riderID: "56789",
//     requesterCovidStatus: "true",
//     requestStatus: "PENDING",
//     requestType: "P&D",
//     paymentPreference: "CASH",
//     itemsListImages: ["somelink"],
//     itemsListList: [{ itemName: "tomato", quantity: "2kg" }],
//     itemCategories: ["GROCERIES", "MISC"],
//     roughLocationCoordinates: [17.46415683066205, 78.38748270276933],
//     pickupLocationCoordinates: {
//       coordinates: [37.7680296, -122.4375126],
//     },
//     pickupLocationAddress: {
//       address: "12-4-126/7",
//       area: "SR Nagar",
//       city: "Hyderabad",
//     },
//     dropLocationCoordinates: {
//       coordinates: [37.7680296, -122.4375126],
//     },
//     dropLocationAddress: {
//       addressLine: "6736BH",
//       area: "B.Hills",
//       city: "Hyderabad",
//     },
//     requesterName: "Some Name",
//     priority: "12",
//   },
//   {
//     date: "7/5/2021",
//     requestNumber: "1245",
//     requesterID: "727777",
//     riderID: "156789",
//     requesterCovidStatus: "true",
//     requestStatus: "PENDING",
//     requestType: "General",
//     itemCategories: ["GROCERIES", "MEDICINES", "MISC"],
//     roughLocationCoordinates: [17.44410138800549, 78.36501180995198],
//     pickupLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//     dropLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//     dropLocationAddress: {
//       addressLine: "6736BH",
//       area: "SR NAGAR",

//       city: "Hyderabad",
//     },
//     priority: "20",
//     requesterName: "Pranchal",
//   },
//   {
//     date: "7/9/2031",
//     requestNumber: "2345",
//     requesterID: "7777787",
//     riderID: "1562789",
//     requestStatus: "PENDING",
//     requestType: "General",
//     itemCategories: ["MISC"],
//     roughLocationCoordinates: [17.431572809383972, 78.3681875451749],
//     pickupLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//     dropLocationAddress: {
//       addressLine: "6736BH",
//       area: "SR Nagar",

//       city: "Hyderabad",
//     },
//     dropLocationCoordinates: {
//       coordinates: [17.9, 78.6],
//     },
//     priority: "0",
//     requesterName: "name",
//   },
// ];
