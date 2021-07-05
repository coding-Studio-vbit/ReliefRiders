import React, { useContext, useState } from "react";
import {Spinner} from "../../global_ui/spinner";
import { AuthContext } from "../../context/auth/authProvider";
import InputField from "../../global_ui/input";
import Navbar from '../../global_ui/nav';
import styles from "./PinAddress.module.css";
import { useHistory } from "react-router-dom";


const PinAddress = () => {
    const { loading} = useContext(AuthContext);
    //const route = useHistory();
    const history = useHistory();

    const routehandler = (route) => {
        history.push(route);
    };
    const [location, setlocation] = useState({
      address: "",
      city: "",
      pincode: "",
    });

    //const { state: { type }, } = useLocation();
    const [errors, setErrors] = useState({
        address: null,
        city: null,
        pincode: null,
      });
      function submit(event) {
        event.preventDefault();
        if(errors.city===errors.pincode===errors.address===null){
          //http request to be performed
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
        } 
        else if (!regE.test(address)) {
            setErrors({
              ...errors,
              address: "Please enter a valid address",
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
        const regE = /^[0-9]*$/;
        if (pincode.length < 6 || pincode.length > 6) {
          setErrors({
            ...errors,
            showErrors: true,
            pincode: "Pincode must contain 6 digits",
          });
        } else if (!regE.test(pincode)) {
          setErrors({
            ...errors,
            pincode: "Please enter a valid pincode",
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
      // const _handleProceed = (e) =>{
      //  if(type === "pickup")
      //  {
      //    console.log(type);
      //  }  
      // else if(type === "drop")
      // {
      //   console.log(type);
      // }
      // else 
      // {
      //   console.log(type);
      // }
      // };
      // const _handleLocation = (e) =>{

      // };
    
return( 
  <div className={styles.chooseAddressPage}>
  <Navbar back='/add_image' backStyle={{ color: 'white' }} title="Choose Location" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />

  <div className={styles.headerText}>
      Choose Pickup Location
      {/* Choose {type} Location: */}
  </div>

  <form className={styles.addressForm} onSubmit={submit}>
      <div className={styles.addressContainer} >
          <div className={styles.textAreaContainer}>

          <InputField        
          fieldType="textarea"
          textAreaClass="headField"
          value={location.address}
          type="text"
          error={errors.address}
          onChange={(e)=>_handleAddress(e)}
          placeholder="Enter Address"
          />
          </div>

          <div className={styles.cityPincode}> 
              <div className={styles.childField}>
                <InputField
                    value={location.city}
                    error={errors.city}
                    onChange={(e)=>_handleCity(e)}
                    type="text"
                    placeholder="City"
                  />    
              </div> 

              <div style={{ width:'20px'}}></div>

              <div className="childField">
              <InputField          
                value={location.pincode}
                error={errors.pincode}
                onChange={(e)=>_handlePincode(e)}
                type="number"
                placeholder="Pincode"
              />
                    
              </div> 
              

              
              
          </div>

      </div>        

      <p style={{margin:1+'em', textAlign: "center", fontSize: 1.2 + "em" }}>OR</p>

      <div style={{marginBottom:1.3+'em'}}>
      {
          loading ? 
          (<Spinner radius="2"/>) 
          :(
            <button
              type="button"
              onClick={() => routehandler("map_location")}
              value="Choose Location"
              className={styles.locationBtn}
            > 
            <i className="fas fa-search-location" id="locationIcon"></i>                  
              Choose Location
            </button>
          )
      }                
      </div>          

      <button className={styles.btnProceed}
        type="submit"
        onClick={() => routehandler("confirm_general")}
        value="Proceed">
        Proceed
      </button>
     
  </form>
</div>
    
);
};

export default PinAddress;