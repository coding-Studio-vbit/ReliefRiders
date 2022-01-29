import React, { useContext, useEffect, useState } from "react";
import ChooseRequestItem from "./chooseRequestItem";
import styles from "./ChooseRequest.module.css";
import axios from "axios";
import { Dialog } from "../../global_ui/dialog/dialog";
import { LoadingScreen } from "../../global_ui/spinner";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/auth/authProvider";

export const ChooseRequest = () => {
  const [sliderValue, setSliderValue] = useState(3);
  const [allRequests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(0);

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

  const {token} = useContext(AuthContext);
  const history = useHistory()
  //sorting requests based on 3 parameters.
  function sortedCustom(param) {
    setFlag(flag + 1);
    let a = [...allRequests];
    if (param == "Date") {
      a.sort(comparisonByDate);
      setRequests(a);
    } else if (param == "Priority") {
      a.sort(comparisonByPriority);
      setRequests(a);
    } else if (param == "Distance") {
      if(coordinates){

        a.sort(comparisonByDistance);
      }
      
    }
    setRequests(a);
  }

  function comparisonByDistance(a, b) {
    //console.log(a.roughLocationCoordinates.coordinates);
    return a.roughLocationCoordinates.coordinates - b.roughLocationCoordinates.coordinates;
  }
  //Comparison function for sorting by date
  function comparisonByDate(dateA, dateB) {
    var c = new Date(dateA.date.split("/")[1]+"/"+dateA.date.split("/")[0]+"/"+dateA.date.split("/")[2]);
    var d = new Date(dateB.date.split("/")[1]+"/"+dateB.date.split("/")[0]+"/"+dateB.date.split("/")[2]);
    return d-c;
  }
  //Comparison function for sorting by priority or urgency
  function comparisonByPriority(a, b) {
    console.log(a)
    return b.urgency - a.urgency;
  }

  //finding current location of rider
  const currentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (err) => {
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

    if (coordinates.lat && coordinates.lng) {
      axios
      .post(`${process.env.REACT_APP_URL}/rider/showFetchedRequests`,{        
          latitude:coordinates.lat,
          longitude:coordinates.lng,
          maxDistance:sliderValue        
      }, options)
      .then((response) => {
        console.log(response.data.message,12);
        if(response.data.status==="success"){
          if (response.data.message.length === 0) {
            setLoading(false);
            setError("No requests found");
          }
          else {
            let data = response.data.message;           
            setRequests(data);
            setLoading(false);
          }
        }
        else if(response.data.status==="failure"){
          setLoading(false)
          setError(response.data.message)
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
    else {
      setLoading(false)
    }
  }, [coordinates, sliderValue]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
              
      <Dialog
        isShowing={error}
        onOK={() => {        
          
          setError(null);
        }}
        msg={error}
      />

      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.backbtn} onClick={()=>{history.replace('/')}}>
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
            <h3 className={styles.noRequests}>No Requests Found.</h3> :
            <div>
              {
                allRequests.map((req, i) => {
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
