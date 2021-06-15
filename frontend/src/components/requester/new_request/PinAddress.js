import React, { useContext, useEffect, useState } from "react";
import {Link,useHistory} from 'react-router-dom';
import { AuthContext } from "../../context/auth/authProvider";
import InputField from "../../../global_ui/input";
import Navbar from "../../global_ui/nav";
const PinAddress = () => {
    const { loading,error} = useContext(AuthContext);
    
    const [location, setlocation] = useState({
      address: "",
      city: "",
      pincode: "",
    });
    const [errors, setErrors] = useState({
        address: "",
        showErrors: false,
        city: "",
        pincode: "",
      });
      function submit(event) {
        event.preventDefault();
        setErrors({
          ...errors,
          showErrors: true,
        });
        
      }
      const _handleAddress = (e) => {
        const address = e.target.value;
        const regE = /^[a-zA-Z0-9\s,'-]*$/;
        if (address === "") {
          setErrors({
            ...errors,
    
            address: "Please enter your address",
          });
        } 
        else if (!regE.test(address)) {
            setErrors({
              ...errors,
              address: "Please enter a valid address(symbols allowed are : - / . ,)",
            });
        }
        else {
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

      const _handlePincode = (e) => {
        const pincode = e.target.value;
        const regE = /^[6-9]\d{9}$/;
        if (pincode.length > 6) {
          setErrors({
            ...errors,
            showErrors: true,
    
            pincode: "Pincode exceeds 6 digits",
          });
        } else if (!regE.test(pincode)) {
          setErrors({
            ...errors,
            pincode: "Please enter a valid pincode",
          });
        } else {
          setErrors({
            ...errors,
            pincode: "",
          });
        }
        setlocation({
          ...location,
          pincode: e.target.value,
        });
      };
    
return( 
    <div className="requester-choose-address">
        <Navbar title="Choose Location" />
    <form className="address_form" onSubmit={submit}>
        <div>
        <p style={{margin:0.5+'em', textAlign: "center", fontSize: 1 + "em" }}>
        Choose PickUP Location:
      </p>
        <InputField
        rows="5" 
        cols="33"
        value={location.address}
        type="text"
        error={errors.showErrors ? errors.address : ""}
        onChange={_handleAddress}
        placeholder="Enter Address"
      />
      <div className="sec-row">
        <InputField
          value={location.city}
          error={errors.showErrors ? errors.city : ""}
          onChange={_handleCity}
          type="text"
          placeholder="City"
        />
        
          <InputField
            value={location.pincode}
            error={errors.showErrors ? errors.pincode : ""}
            onChange={_handlePincode}
            type="number"
            placeholder="Pincode"
          />
      </div>
          <br/>
          <br/>
          <p style={{margin:0.7+'em', textAlign: "center", fontSize: 0.5 + "em" }}>or</p>

          {loading ? (
        <Spinner radius="2" />
      ) : (
        <button
          type="button"
          onClick={(e) => handleLocation(e)}
          value="Choose Location"
          className="locationbtn"
        >
          Choose Location
        </button>
      )}
      </div>

      <div className="req-confirm">

        <button className="btn-proceed"
        type="submit"
        onClick={(e) => handleProceed(e)}
        value="Proceed">
        Proceed
        </button>
      </div>
      </form>
    </div>
    
);
};

export default PinAddress;