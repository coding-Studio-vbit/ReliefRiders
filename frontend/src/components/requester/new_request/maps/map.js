import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "../../../global_ui/nav";
import { Marker } from "@react-google-maps/api";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { LoadingScreen } from "../../../global_ui/spinner";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { NewRequestContext } from "../../../context/new_request/newRequestProvider";

const libraries = ["drawing", "places"];

function Map() {
  const history = useHistory();
  console.log(history.location.state);
  const { pickup } = useParams();

  const isPickUp = pickup === "true" ? true : false;
  const {
    dispatch,
    state: { requestType, pickupLocationCoordinates, dropLocationCoordinates },
  } = useContext(NewRequestContext);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [centerMaps, setCenterMaps] = useState(null);

  const _handleMarker = (latlng) => {
    setCoordinates({ lat: latlng.lat(), lng: latlng.lng() });
  };
  const search = useRef({});
  const setCurrentLocation = () => {
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
          alert("Please allow location permission");
        }
      });
    }
  };

  useEffect(() => {
    if (isPickUp) {
      console.log(pickupLocationCoordinates);
      if (pickupLocationCoordinates.length !== 0) {
        setCoordinates({
          lat: pickupLocationCoordinates[0],
          lng: pickupLocationCoordinates[1],
        });
        setCenterMaps({
          lat: pickupLocationCoordinates[0],
          lng: pickupLocationCoordinates[1],
        });
      } else setCurrentLocation();
    } else if (dropLocationCoordinates.length !== 0) {
      setCenterMaps({
        lat: dropLocationCoordinates[0],
        lng: dropLocationCoordinates[1],
      });
      setCoordinates({
        lat: dropLocationCoordinates[0],
        lng: dropLocationCoordinates[1],
      });
    } else setCurrentLocation();

    setLoading(false);
  }, []);

  const onLoad = (ref) => {
    search.current = ref;
  };
  const onPlacesLoaded = () => {
    setCenterMaps({
      lat: search.current.getPlaces()[0].geometry.location.lat(),
      lng: search.current.getPlaces()[0].geometry.location.lng(),
    });
    setCoordinates({
      lat: search.current.getPlaces()[0].geometry.location.lat(),
      lng: search.current.getPlaces()[0].geometry.location.lng(),
    });
  };
  const chooseAddress = () => {
    if (requestType === "general") {
      dispatch({
        type: "ADD_DROP_LOCATION_COORDINATES",
        payload: [coordinates.lng, coordinates.lat],
      });
    } else {
      console.log(isPickUp);
      if (isPickUp) {
        dispatch({
          type: "ADD_PICKUP_LOCATION_COORDINATES",
          payload: [coordinates.lng, coordinates.lat],
        });
      } else {
        dispatch({
          type: "ADD_DROP_LOCATION_COORDINATES",
          payload: [coordinates.lng, coordinates.lat],
        });
      }
    }
    history.replace(`/new_request/address_${isPickUp ? "pickup" : "drop"}`);
  };
  return (
    <div>
      {" "}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div style={{ height: "100vh" }}>
          <Navbar
            style={{
              marginBottom: "0",
            }}
            back={
              isPickUp
                ? "/new_request/address_pickup"
                : "/new_request/address_drop"
            }
            title="Choose Location"
          />
          

          
          <LoadScript
            libraries={libraries}
            googleMapsApiKey={process.env.REACT_APP_GMAP_API_KEY}
          >
            <GoogleMap
              onClick={(e) => _handleMarker(e.latLng)}
              mapContainerStyle={{
                height: "min(85%,550px)",
              }}
              center={centerMaps}
              zoom={15}
            >
              {coordinates && <Marker position={coordinates} />}
              <div 
                  style={{
                    position: "fixed",
                    
                    bottom: "8vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                   
                  }}
                  >
              <StandaloneSearchBox
                  onLoad={onLoad}
                  onPlacesChanged={onPlacesLoaded}
                >
                  

                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      boxSizing: `border-box`,
                      border: `2px solid #ddd`,
                      width: `min(350px,90%)`,
                      display: "block",
                      height: `32px`,
                      padding: `16px 12px`,
                      borderRadius: `4px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3),`,
                      fontSize: `14px`,
                      textOverflow: `ellipses`,
                      marginTop: "1rem",
                      margin: "0 auto",
                     
                    }}
                    
                    >
                    

                  </input>
                  
                </StandaloneSearchBox>
                <button
                  onClick={chooseAddress}
                  style={{
                    color: "white",
                    background: "var(--secondary)",
                    padding: 0.8 + "em",
                    marginTop: "1.9rem",

                    width: "30ch",
                  }}
                >
                  Choose Pinned Address
                </button>
                    </div>
            </GoogleMap>
          </LoadScript>
         
        </div>
        
      )}
    </div>
  );
}

export default Map;
