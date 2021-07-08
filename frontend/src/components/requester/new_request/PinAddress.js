import React, { useContext, useEffect, useState } from "react";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import styles from "./PinAddress.module.css";
import { useHistory } from "react-router-dom";
import { NewRequestContext } from "../../context/new_request/newRequestProvider";
import { useSessionStorageState } from "../../../utils/useLocalStorageState";

const PinAddress = () => {
  const {
    dispatch,
    state: { requestType, uploadItemsList, pickupLocation, dropLocation },
  } = useContext(NewRequestContext);
  const history = useHistory();
  const {
    location: { state },
  } = history;
  useEffect(() => {
    if (state) {
      setPickup(state.isPickUp);
    }
  }, []);
  
  const [pickup, setPickup] = useSessionStorageState("addressType", true);

  const routehandler = (route) => {
    const p = pickup;
    setPickup(false);
    history.push(route, { isPickUp: p });
  };

  const [location, setlocation] = useSessionStorageState("address", {
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState(() =>
    sessionStorage.getItem("address")
      ? {
          address: null,
          city: null,
          pincode: null,
          showErrors: false,
        }
      : {
          address: "Empty",
          city: "Empty",
          pincode: "Empty",
          showErrors: false,
        }
  );

  function submit(event) {
    event.preventDefault();

    if (
      errors.city === null &&
      errors.pincode === null &&
      errors.address === null
    ) {
      //http request to be performed
      if (pickup && requestType === "p&d") {
        dispatch({ type: "ADD_PICKUP_ADDRESS", payload: location });
        if (dropLocation) {
          setlocation(dropLocation);
        } else {
          setlocation({
            address: "",
            city: "",
            pincode: "",
          });
        }
        setPickup(false);
      } else {
        dispatch({ type: "ADD_DROP_ADDRESS", payload: location });
        if (requestType === "general") {
          history.push("confirm_general");
        } else history.push("confirm_pd");
      }
    }
    setErrors({
      ...errors,
      showErrors: true,
    });
  }

  const _handleAddress = (e) => {
    const address = e.target.value;
    const regE = /^[A-Za-z0-9'\-\s]*$/;
    if (address === "") {
      setErrors({
        ...errors,

        address: "Please enter your address",
      });
    } else if (!regE.test(address)) {
      setErrors({
        ...errors,
        address: "Please enter a valid address",
      });
    } else {
      setErrors({
        ...errors,
        address: null,
      });
    }
    setlocation({
      ...location,
      address: e.target.value,
    });
  };

  
  const _handleCity = (e) => {
    const city = e.target.value;
    if (city === "") {
      setErrors({
        ...errors,

        city: "Please enter the city",
      });
    } else {
      setErrors({
        ...errors,
        city: null,
      });
    }
    setlocation({
      ...location,
      city: e.target.value,
    });
  };

  const _handlePincode = (e) => {
    const pincode = e.target.value;

    if (pincode.length === 0) {
      setErrors({
        ...errors,

        pincode: "Pincode must contain 6 digits",
      });
    } else {
      setErrors({
        ...errors,
        pincode: null,
      });
    }
    setlocation({
      ...location,
      pincode: e.target.value,
    });
  };
 console.log(uploadItemsList);
  return (
    <div className={styles.chooseAddressPage}>
      <Navbar
        back={uploadItemsList ? "add_image" : "enter_items"}
        onBackClick={
          !pickup
            ? () => {
                const data = pickupLocation;
                console.log(data);
                setlocation(data);
                setPickup(true);
              }
            : null
        }
        backStyle={{ color: "white" }}
        title="Choose Location"
        titleStyle={{ color: "white" }}
        style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}
      />

      <div className={styles.headerText}>
        Choose {requestType === "general" ? "Drop" : pickup ? "Pickup" : "Drop"}{" "}
        Location
        {/* Choose {type} Location: */}
      </div>

      <form className={styles.addressForm}>
        <div className={styles.addressContainer}>
          <div className={styles.textAreaContainer}>
            <InputField
              fieldType="textarea"
              textAreaClass="headField"
              value={location.address}
              type="text"
              error={errors.showErrors ? errors.address : ""}
              onChange={(e) => _handleAddress(e)}
              placeholder="Enter Address"
            />
          </div>

          <div className={styles.cityPincode}>
            <div className={styles.childField}>
              <InputField
                value={location.city}
                error={errors.showErrors ? errors.city : ""}
                onChange={(e) => _handleCity(e)}
                type="text"
                placeholder="City"
              />
            </div>

            <div style={{ width: "20px" }}></div>

            <div className="childField">
              <InputField
                value={location.pincode}
                error={errors.showErrors ? errors.pincode : ""}
                onChange={(e) => _handlePincode(e)}
                type="text"
                placeholder="Area"
              />
            </div>
          </div>
        </div>

        <p
          style={{
            margin: 1 + "em",
            textAlign: "center",
            fontSize: 1.2 + "em",
          }}
        >
          OR
        </p>

        <div style={{ marginBottom: 1.3 + "em" }}>
          
            <button
              type="button"
              onClick={() => routehandler("map_location")}
              value="Choose Location"
              className={styles.locationBtn}
            >
              <i className="fas fa-search-location" id="locationIcon"></i>
              Choose Location
            </button>
          
        </div>

        <button
          className={styles.btnProceed}
          type="submit"
          onClick={(e) => submit(e)}
          value="Proceed"
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default PinAddress;
