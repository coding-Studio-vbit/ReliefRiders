import React from 'react';
import {useState } from "react";
import styles from "./editRiderProfile.module.css";
import axios from 'axios';
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";

import Dialog from '../../global_ui/dialog/dialog';

const EditRiderProfile = () => {

  const [requestError, setRequestError] = useState(null);
  const token = localStorage.getItem('token')

  const [data, setData] = useState({
    profilePhoto: "",
    fullName :"",
    phoneNumber:"",       
  });    
 

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null);
    

  function updateProfile() {
    const options={
     headers: {
       'authorization': 'Bearer ' + token
   }
    }
    axios.put('http://localhost:8000/rider/profile',options)
   
    .then(response =>setData(response.data))
    .catch((error)=>{
      setRequestError(error)
    })
 }
 const submit = async(event)=>{
   event.preventDefault();
   const d= data;
   validateName({target:{value:d.fullName}})
   validatePhNumber({target:{value:d.phoneNumber}})
   console.log(fullNameError||phoneNumberError)
   if(fullNameError||phoneNumberError)
   console.log(fullNameError,phoneNumberError)
 
 else
 { updateProfile()}
 }
  
 const validatePhNumber = (e) => {
  const phoneNumber = e.target.value;
  const regE = /^[6-9]\d{9}$/;
  if (phoneNumber.length > 10) {
    setphoneNumberError(
      "Phone number exceeds 10 digits"
      );
  } else if (!regE.test(phoneNumber)) {
    setphoneNumberError(
      "Please enter a valid number"
      );
  } else {
    setphoneNumberError(
      null
    );
  }
  setData({
    ...data,
    phoneNumber: e.target.value,
  });
};
  
const validateName = (e) => {
  const fullName = e.target.value;
  if (fullName === "") {
    setfullNameError(
      "Please enter your name"
 );
  } else if (!/^[a-zA-Z]*$/.test(fullName)) {
    setfullNameError(
      "Please enter a valid name"
    );
  } else if (fullName.length < 3) {
    setfullNameError(
      "Name must be atleast 3 characters!"
   );
  } else {
    setfullNameError(
      null
    );
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
                 <Dialog isShowing={requestError} onOK={()=>setRequestError()} />

            <form className={styles.form} onSubmit={submit}> 
                <img className={styles.profileImage}></img>

                <InputField 
            value={data.fullName}
            type = "text"
            maxLength ="40"
            placeholder="Enter your name"
            error={fullNameError? fullNameError : null}
            onChange={validateName}
            
           
        />

                <InputField
                  value={data.phoneNumber}
                  type="number"
                  maxLength="10"
                  placeholder="Mobile Number"
                  error={phoneNumberError ? phoneNumberError : ""}
                  onChange={validatePhNumber}/> 


                <div className={styles.filler}></div>                 

                <button onClick={submit} className={styles.btn}>Save Changes</button>     

            </form>

        </div>        
    );
  };
  
  export default EditRiderProfile;