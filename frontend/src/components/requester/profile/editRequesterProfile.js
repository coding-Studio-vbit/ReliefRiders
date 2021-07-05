import React from 'react';
import {useState} from "react";
import axios from 'axios'
import styles from "./editRequesterProfile.module.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
// import { useHistory } from 'react-router-dom';
import Dialog from '../../global_ui/dialog/dialog';

const EditRequesterProfile = () => {
  //pass a prop here to get data

  // const history = useHistory();
  const token = localStorage.getItem('token')
  const [requestError, setRequestError] = useState(null); 

  //use when you pass prop
  // const [data, setData] = useState({
  //   profilePhoto:profile.profilePhoto ,
  //   fullName :profile.fullName,
  //   phoneNumber:profile.phoneNumber,
  //   yearOfBirth:profile.yearOfBirth,
  //   address:profile.address,
  //   city:profile.city,
  //   pincode:profile.pincode,
  // });

  const [data, setData] = useState({
    profilePhoto:"" ,
    fullName :"",
    phoneNumber:"",
    yearOfBirth:"",
    address:"",
    city:"",
    pincode:"",
  });

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null);
  const [yearOfBirthError, setyearOfBirthError] = useState(null);
  const [addressError, setaddressError] = useState(null);
  const [cityError, setcityError] = useState(null);
  const [pincodeError, setpincodeError] = useState(null);

  

  function updateProfile() {
    const options = {
      headers: {
          'authorization': 'Bearer ' + token
      }
    }
    axios.put('http://localhost:8000/requester/profile',options)
          .then(response => setData(response.data))
          .catch((error)=>{
          setRequestError(error)
    })    
  }

    const submit = async(event)=> {
      event.preventDefault();
      const d=data;      
      validateCity({target:{value:d.city}})
      validateName({target:{value:d.fullName}})
      validatePincode({target:{value:d.city}})
      validateYear({target:{value:d.yearOfBirth}})
      validatePhNumber({target:{value:d.phoneNumber}})
      validateAddress({target:{value:d.address}})
      
      console.log(cityError||phoneNumberError || pincodeError || fullNameError || yearOfBirthError ||addressError);


      if(cityError||phoneNumberError || pincodeError || fullNameError || yearOfBirthError ||addressError){
        console.log(cityError,phoneNumberError,pincodeError,fullNameError,yearOfBirthError,addressError);
      }
      else{
        updateProfile();
      }    
    }
  
    const validatePhNumber = (e) => {
      const phoneNumber = e.target.value;
      const regE = /^[6-9]\d{9}$/;

      if (phoneNumber.length > 10) {
        setphoneNumberError(
          "Phone number exceeds 10 digits"
          );
      } 
      else if (!regE.test(phoneNumber)) {
        setphoneNumberError(
          "Please enter a valid number"
          );
      } 
      else {
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
      } 
      else if (!/^[a-zA-Z]*$/.test(fullName)) {
        setfullNameError(
          "Please enter a valid name"
        );
      } 
      else if (fullName.length < 3) {
        setfullNameError(
           "Name must be atleast 3 characters!"
        );
      } 
      else {
        setfullNameError(
          null
        );
      }      
      setData({
        ...data,
        fullName: e.target.value,
      });
    };

    const validateAddress = (e) => { 
      const address = e.target.value;
      
      if(address===""){
        setaddressError(
        "Address cannot be Empty"
        )
      } 
      else{
        setaddressError(
          null
        )
      }      
      setData({
          ...data,
          address: e.target.value
      })
    };

    const validateCity = (e) => {
      const city = e.target.value;

      if(city===""){
        setcityError(
          "City field cannot be Empty"
        )
      }  
      else{
        setcityError(
          null
        )
      }     
      setData({
          ...data,
          city: city
      })
    };

    const validatePincode = (e) => {
      const pincode = e.target.value;

       if (pincode === "") {
          setpincodeError(
           "Please enter Pincode"
          );
        }
        else if(pincode.length>6){
            setpincodeError(
                "Invalid Pincode!"
            );
        }
        else if(pincode.length<6){
          setpincodeError(
            "Invalid Pincode!"
          );
        } 
        else {
          setpincodeError(null);
        } 
        setData({
            ...data,
            pincode: e.target.value,
        });
    };
  
    const validateYear = (e) => {
      // console.log(new Date().getFullYear() - 100);
      const year = e.target.value;
      const cyear = new Date().getFullYear();
  
      if (!parseInt(year) || parseInt(year) < cyear - 100) {
        setyearOfBirthError(
         "Invalid Year!"
        );
      } 
      else if (parseInt(year) > cyear - 13) {
        setyearOfBirthError(
          "Invalid Year!"
        );
      } 
      else if (year.length == 0) {
        setyearOfBirthError(
         "Enter Year!"
        );
      } 
      else if (year.length != 4) {
        setyearOfBirthError(  
           "Invalid Year"
        );
      } 
      else {
        setyearOfBirthError(  
          null
       );
      }
      setData({
        ...data,
        yearOfBirth: e.target.value,
      });
    };

    return (        
        <div className={styles.requesterProfileContainer}>

            <Navbar back={true} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
            
            <Dialog isShowing={requestError} onOK={()=>setRequestError()} />
            
            <form className={styles.editProfileForm} onSubmit={submit}>
                
                <img className={styles.profileImage}></img>

                <InputField 
                
                value={data.fullName}
                type = "text"
                maxLength ="40"
                placeholder="Name"
                error={fullNameError?fullNameError:null}
                onChange={validateName}                
                />
                <InputField
                value={data.phoneNumber}
                type="number"
                maxLength="10"
                placeholder="Mobile Number"
                error={ phoneNumberError  ? phoneNumberError : null}
                onChange={validatePhNumber}            
                />
                <InputField
                value={data.yearOfBirth}
                type="number"
                maxLength="4"
                placeholder="Year Of Birth"
                error={ yearOfBirthError ? yearOfBirthError : null}
                onChange={validateYear}
                />

                <div className={styles.address}>
                    <div className={styles.completeAddress}>
                        <InputField                
                        value={data.address}
                        placeholder="Address"
                        onChange={validateAddress}
                        error={ addressError ? addressError :null}
                        />
                    </div>

                    <div className={styles.city}>
                        <InputField
                          value={data.city}
                          type="text"
                          placeholder="City"
                          error={cityError? cityError : null}
                          onChange={validateCity}
                          />                        
                    </div>

                    <div className={styles.pincode}>
                        <InputField 
                        value={data.pincode}
                        type="number"
                        placeholder="Pincode"
                        error={ pincodeError ? pincodeError:null}
                        onChange={validatePincode}
                        />
                    </div>  

                </div>       
            </form>
              
            <button onClick={submit} className="submit">Save Changes</button>

        </div>  
        );
      };
  
export default EditRequesterProfile;
  
