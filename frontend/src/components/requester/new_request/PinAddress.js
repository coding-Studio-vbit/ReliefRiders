import React, { useContext, useState } from "react";
import Spinner from "../../global_ui/spinner";
import { AuthContext } from "../../context/auth/authProvider";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import "./PinAddress.css";
import { useHistory } from "react-router-dom";


const PinAddress = () => {
    const { loading} = useContext(AuthContext);
    const route = useHistory();
    const [location, setlocation] = useState({
      address: "",
      city: "",
      pincode: "",
    });
    const { state: { type }, } = useLocation();
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
      const _handleProceed = (e) =>{
       if(type === "pickup")
       {
         console.log(type);
       }  
      else if(type === "drop")
      {
        console.log(type);
      }
      else 
      {
        console.log(type);
      }
      };
      const _handleLocation = (e) =>{

      };
    
return( 
    <div className="requester_choose_address">
        <Navbar title="Choose Location" />
    <form className="address_form" onSubmit={submit}>
        <div>
          <p style={{margin:0.1+'em', textAlign: "center", fontSize: 1 + "em" }}>
        Choose {type} Location:
      </p>

        <InputField
        value={location.address}
        type="text"
        //error={errors.showErrors ? errors.address : ""}
        onChange={_handleAddress}
        placeholder="Enter Address"
      />
      <div className="city-pincode">
        <InputField
          value={location.city}
          //error={errors.showErrors ? errors.city : ""}
          onChange={_handleCity}
          type="text"
          placeholder="City"
        />
        
          <InputField
            value={location.pincode}
            //error={errors.showErrors ? errors.pincode : ""}
            onChange={_handlePincode}
            type="number"
            placeholder="Pincode"
          />
      </div>

          <p style={{margin:1+'em', textAlign: "center", fontSize: 1 + "em" }}>or</p>

          {loading ? (
        <Spinner radius="2" />
      ) : (
        <button
          type="button"
          onClick={(e) => handleLocation(e)}
          value="Choose Location"
          className="locationbtn"
        >
          <i className="fas fa-search-location"></i>
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