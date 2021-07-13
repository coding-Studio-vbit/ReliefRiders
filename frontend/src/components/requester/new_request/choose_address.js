import React, { useContext, useState } from "react";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import styles from "./choose_address.module.css";
import { useHistory } from "react-router-dom";
import { NewRequestContext } from "../../context/new_request/newRequestProvider";

const ChooseAddress = ({ pickup }) => {
  const {
    dispatch,
    state: {
      requestType,
      uploadItemsList,
      dropLocation,
      pickupLocation,
      dropLocationCoordinates,
      pickupLocationCoordinates,
    },
  } = useContext(NewRequestContext);
  const history = useHistory();

  const [location, setlocation] = useState(
    pickup ? pickupLocation : dropLocation
  );

  const [errors, setErrors] = useState({
    address: "Enter address",
    city: "Enter city",
    area: "Enter area",
    showErrors: false,
  });

  const proceed = () => {
    if (pickup) {
      dispatch({ type: "ADD_PICKUP_ADDRESS", payload: location });
      history.push("address_drop");
    } else {
      dispatch({
        type: "ADD_DROP_ADDRESS",
        payload: location,
      });
      if (requestType === "general") {
        history.push("confirm_general");
      } else history.push("confirm_pd");
    }
  };

  function submit(event) {
    event.preventDefault();
    if (
      location.city !== "" &&
      location.area !== "" &&
      location.address !== ""
    ) {
      proceed();
    } else {
      if (
        (pickup && pickupLocationCoordinates.length !== 0) ||
        (!pickup && dropLocationCoordinates.length !== 0)
      ) {
        if (pickup) {
          history.push("address_drop");
        } else {
          if (requestType === "general") {
            history.push("confirm_general");
          } else history.push("confirm_pd");
        }
      } else {
        setErrors({ ...errors, showErrors: true });
      }
    }
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
  const selectedMapMsg = (
    <p
      style={{
        textAlign: "center",
        marginBottom: "4px",
        color: "green",
        fontWeight: "bold",
      }}
    >
      Selected {pickup ? "PICKUP" : "DROP"} Location
    </p>
  );
  return (
    <div className={styles.chooseAddressPage}>
      <Navbar
        back={"unnecessary"}
        onBackClick={() => {
          if (pickup) {
            if (uploadItemsList) history.replace("add_image");
            else history.replace("enter_items");
          } else {
            if (requestType === "general") {
              if (uploadItemsList) history.replace("add_image");
              else history.replace("enter_items");
            } else history.replace("address_pickup");
          }
        }}
        title="Choose Location"
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
              name="address"
              ukey={"address" + pickup}
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
          {pickup && pickupLocationCoordinates.length !== 0 && selectedMapMsg}
          {!pickup && dropLocationCoordinates.length !== 0 && selectedMapMsg}
          <button
            type="button"
            onClick={() => {
              history.push("map_location/"+pickup);
            }}
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

export default ChooseAddress;
