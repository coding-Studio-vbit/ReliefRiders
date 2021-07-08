/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "../../../global_ui/nav";
import { Marker } from "@react-google-maps/api";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef,useState } from "react";
import { LoadingScreen } from "../../../global_ui/spinner";
import { useEffect } from "react";
import {useHistory} from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { NewRequestContext } from "../../../context/new_request/newRequestProvider";


const libraries = ["drawing", "places"];

function Map() {
  const containerStyle = {
    minHeight: "60vh",
  };
  const history= useHistory();
   const {
    location: {
      state: { isPickUp },
    },
  } = history;
  const {dispatch,state:{requestType,uploadItemsList}} = useContext(NewRequestContext)
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [centerMaps, setCenterMaps] = useState(null);

  const _handleMarker = (latlng) => {
    setCoordinates({ lat: latlng.lat(), lng: latlng.lng() });
  };
  const search = useRef({});
  useEffect(() => {
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
    console.log(coordinates);
    if(requestType === 'general'){
      dispatch({type:"ADD_DROP_LOCATION_COORDINATES",payload:[coordinates.lat,coordinates.lng],leftOffRoute:'confirm_general'})
      history.push('confirm_general')
    }else{
      if(isPickUp){
        dispatch({type:"ADD_PICKUP_LOCATION_COORDINATES",payload:[coordinates.lat,coordinates.lng]})

        history.push('address',{isPickUp:false})
      }else{
        dispatch({type:"ADD_DROP_LOCATION_COORDINATES",payload:[coordinates.lat,coordinates.lng],leftOffRoute:'confirm_pd'})

        history.push('confirm_pd')
      }
    }
    
  };
  return loading ? (
    <LoadingScreen />
  ) : (
    <div style={{ display: `grid`, height: "100%" }}>
      <Navbar
        back={uploadItemsList?"add_image": "enter_items"}
        title="Choose Location"
        style={{ backgroundColor: "#79CBC5", color: 'white' }}
      />

      <LoadScript
        libraries={libraries}
        // eslint-disable-next-line no-undef
        googleMapsApiKey={process.env.REACT_APP_GMAP_API_KEY}
      >
        <GoogleMap
          onClick={(e) => _handleMarker(e.latLng)}
          mapContainerStyle={containerStyle}
          center={centerMaps}
          zoom={15}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {coordinates && <Marker position={coordinates} />}

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
                height: `32px`,
                padding: `16px 12px`,
                borderRadius: `4px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3),`,
                fontSize: `14px`,
                textOverflow: `ellipses`,
                position: "fixed",
                marginTop: "3%",
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                top: "73vh",
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
      <p style={{ textAlign: "center", marginTop: "1vw", marginBottom: "2%" }}>Pin your location</p>
      <button
        onClick={chooseAddress}
        
        style={{
          position: "fixed",
          top: "85vh",
          left: 0,
          fontWeight: "bold",
          color: "white",
          background: "#79CBC5",
          padding: 0.8 + "em",
          right: 0,
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "2vw"
        }}
      >
        Choose Pinned Address
      </button>
    </div>
  );
}

export default Map;
