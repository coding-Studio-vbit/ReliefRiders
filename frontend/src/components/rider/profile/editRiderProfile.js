import React from 'react';
import {useState,useEffect } from "react";
import styles from "./editRiderProfile.module.css";
import axios from 'axios';
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import { useHistory } from 'react-router';

const EditRiderProfile = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token')

  const [data, setData] = useState({
    profilePhoto: "",
    fullName :"",
    phoneNumber:"",       
  });    

  const [errors, setErrors] = useState({        
      fullName :"",
      phoneNumber:"",
      yearOfBirth:"",       
      showError: false
  });

  async function updateRiderProfile() {
    const options = {
      headers: {
          'authorization': 'Bearer ' + token
      }
    } 
    try {
      const response = await  axios.put('http://localhost:8000/rider/profile',options)
      .then(response => setData(response.data)); 
      console.log(response);
    } 
    catch (error) {
      console.error(error);
      setError(error);
      }
   } 
    
    function submit(event) {
      event.preventDefault();
      console.log(event);
      
      validateName("submit");
      setErrors({
        ...errors,
        showErrors: true,
      });
    }
  
    const validatePhNumber = (e) => {
      const phoneNumber = e.target.value;
      setErrors({
        ...errors,
        phoneNumber: null,
      });
      const regE = /^[6-9]\d{9}$/;
      if (phoneNumber.length > 10) {
        setErrors({
          ...errors,
          showErrors: true,
  
          phoneNumber: "Phone number exceeds 10 digits",
        });
      } else if (!regE.test(phoneNumber)) {
        setErrors({
          ...errors,
          phoneNumber: "Please enter a valid number",
        });
      } else {
        setErrors({
          ...errors,
          phoneNumber: null,
        });
      }
      setData({
        ...data,
        phoneNumber: e.target.value,
      });
    };
  
    const validateName = (e) => {
      const fullName = e.target.value;
      setErrors({
        ...errors,
        fullName:null
      })
      if (fullName === "") {
        setErrors({
          ...errors,
  
          fullName: "Please enter your name",
        });
      } else if (!/^[a-zA-Z]*$/.test(fullName)) {
        setErrors({
          ...errors,
  
          fullName: "Please enter a valid name",
        });
      } else if (fullName.length < 3) {
        setErrors({
          ...errors,
  
          fullName: "Name must be atleast 3 characters!",
        });
      } else {
        setErrors({
          ...errors,
          fullName:null,
        });
      }
      setData({
        ...data,
        fullName: e.target.value,
      });
    };   

    return (        
        <div className={styles.riderProfileContainer}>

            <Navbar 
            back={true} 
            backStyle={{ color: 'white' }} 
            title="My Account" titleStyle={{ color: 'white' }} 
            style={{ backgroundColor: '#79CBC5', marginBottom: "8px" }} />          

            <form className={styles.form} onSubmit={submit}> 
                <img className={styles.profileImage}></img>

                <InputField 
                    value={data.fullName}
                    type = "text"
                    maxLength ="40"
                    placeholder="Name"
                    error={errors.fullName ? errors.fullName : ""}
                    onChange={validateName}/>

                <InputField
                  value={data.phoneNumber}
                  type="number"
                  maxLength="10"
                  placeholder="Mobile Number"
                  error={errors.phoneNumber ? errors.phoneNumber : ""}
                  onChange={validatePhNumber}/> 


                <div className={styles.filler}></div>                 

                <button onClick={submit} className={styles.btn}>Save Changes</button>     

            </form>

        </div>        
    );
  };
  
  export default EditRiderProfile;