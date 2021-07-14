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
      if (state.isPickUp) {
        setlocation(pickupLocation);
      } else {
        setlocation(dropLocation);
      }

      setPickup(state.isPickUp);
    }
    // }else if(requestType === 'p&d') setlocation(pickupLocation)
    // else if(dropLocation) setlocation(dropLocation)
  }, []);

  const [pickup, setPickup] = useSessionStorageState("addressType", true);

  const routehandler = (route) => {
    const p = pickup;
    setPickup(false);
    history.push(route + "/" + p);
  };

  const [location, setlocation] = useState({
    address: "",
    city: "",
    area: "",
  });

  const [errors, setErrors] = useState({
    address: "Enter address",
    city: "Enter city",
    area: "Enter area",
    showErrors: false,
  });

  function submit(event) {
    event.preventDefault();
    console.log(location);
    if (
      location.city !== "" &&
      location.area !== "" &&
      location.address !== ""
    ) {
      //http request to be performed
      if (pickup && requestType === "p&d") {
        dispatch({ type: "ADD_PICKUP_ADDRESS", payload: location });
        if (Object.keys(dropLocation).length !== 0) {
          setlocation(dropLocation);
        } else {
          setlocation({
            address: "",
            city: "",
            area: "",
          });
        }
        setPickup(false);
      } else {
        dispatch({
          type: "ADD_DROP_ADDRESS",
          payload: location,
        });
        if (requestType === "general") {
          history.push("confirm_general");
        } else history.push("confirm_pd");
      }
    } else
      setErrors({
        ...errors,
        showErrors: true,
      });
  }

  const _handleAddress = (e) => {
    const address = e.target.value;
    if (address === "") {
      setErrors({
        ...errors,
        address: "Please enter your address",
      });
    } else {
      setErrors({
        ...errors,
        address: "",
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
        city: "",
      });
    }
    setlocation({
      ...location,
      city: e.target.value,
    });
  };

  const _handlearea = (e) => {
    const area = e.target.value;

    if (area.length === 0) {
      setErrors({
        ...errors,

        area: "Area must not be empty",
      });
    } else {
      setErrors({
        ...errors,
        area: "",
      });
    }
    setlocation({
      ...location,
      area: area,
    });
  };
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
                value={location.area}
                error={errors.showErrors ? errors.area : ""}
                onChange={(e) => _handlearea(e)}
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
