import React from 'react';
import {useState,useEffect} from "react";
import axios from 'axios'
import styles from "./editRequesterProfile.module.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import {Dialog} from '../../global_ui/dialog/dialog';
import TextArea from '../../global_ui/textarea/textArea';
import {LoadingScreen} from '../../global_ui/spinner';
import { useHistory } from 'react-router-dom';

const EditRequesterProfile = () => {
  const history =useHistory()
  const token = localStorage.getItem('token')
  const [requestError, setRequestError] = useState(null);
  const [isProfileUpdated, setisProfileUpdated] = useState(false);

  const [data, setData] = useState({
    profilePhoto:"",
    fullName :"",
    phoneNumber:"",
    yearOfBirth:"",
    address:"",
    city:"",
    pincode:"",
  });

  const [isLoaded, setisLoaded] = useState(false);

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null);
  const [yearOfBirthError, setyearOfBirthError] = useState(null);
  const [addressError, setaddressError] = useState(null);
  const [cityError, setcityError] = useState(null);
  const [pincodeError, setpincodeError] = useState(null);


  useEffect(
    async () => {
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
        axios.get('http://localhost:8000/requester/profile',options)
        .then(response => {
          if(response.data.status==="success"){
            console.log(response);
            setData({
              fullName:response.data.result.name,
              phoneNumber:response.data.result.phoneNumber,
              address:response.data.result.address,
              city:response.data.result.city,
              pincode:response.data.result.pincode,
              yearOfBirth:response.data.result.yearOfBirth,
              profileURL:response.data.result.profileURL
          });
          setRequestError(null);
          }
          else{
            setRequestError(response.data.message)
          } 
          setisLoaded(true);           
        }, error => {
            console.log("An error occured", error);
            setRequestError(error.toString());
            setisLoaded(true);
        })
    }, [])

    async function showSnackBar() {
      setTimeout(() => {
        setisProfileUpdated(false)
      }, 2000);    
    }
  
    function updateProfile() {
      setisLoaded(false)
      const options = {
        headers: {
            'authorization': 'Bearer ' + token
        }
      }
      axios.put('http://localhost:8000/requester/profile',data,options)
            .then(
              response => {
                if(response.data.status=="success"){
                  console.log(response);
                  setRequestError(null);
                  setisProfileUpdated(true);
                  showSnackBar();
                  history.replace("/my_profile")
                }
                else{
                  throw Error(response.data.message)
                }
                setisLoaded(true)                
              })
            .catch((error)=>{              
            setRequestError(error.toString());
            setisLoaded(true);
      })    
    }

    function validateAll() {
        const d=data;
        if(
          validateCity({target:{value:d.city}})& 
          validateName({target:{value:d.fullName}})&
          validatePincode({target:{value:d.pincode}})&
          validateYear({target:{value:d.yearOfBirth}})&
          validatePhNumber({target:{value:d.phoneNumber}})&
          validateAddress({target:{value:d.address}})
        ){
          return true
        }
        return false    
      }

    const submit = async(event)=> {
      event.preventDefault();  
      if(validateAll()){
        updateProfile();
      }
      else{
        console.log("Update Failed");
      }           
    }
  
    const validatePhNumber = (e) => {
      const phoneNumber = e.target.value;
      const regE = /^[6-9]\d{9}$/;
      let flag=false;

      if (phoneNumber.length > 10) {
        setphoneNumberError(
          "Mobile Number exceeds 10 digits"
          );
      } 
      else if (!regE.test(phoneNumber)) {
        setphoneNumberError(
          "Enter a valid Mobile Number"
          );
      } 
      else {
        setphoneNumberError(
          null
        );
        flag=true;
      }
      setData({
        ...data,
        phoneNumber: e.target.value,
      });
      return flag;
    };
  
    const validateName = (e) => {
      const fullName = e.target.value;
      let flag=false;

      if (fullName === "") {
        setfullNameError(
           "Name cannot be Empty"
      );
      } 
      else if (!/^[a-zA-Z .]*$/.test(fullName)) {
        setfullNameError(
          "Name must contain only alphabets"
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
        flag=true
      }      
      setData({
        ...data,
        fullName: e.target.value,
      });
      return flag;
    };

    const validateAddress = (e) => { 
      const address = e.target.value;
      let flag=false;
      
      if(address===""){
        setaddressError(
        "Address cannot be Empty"
        )
      } 
      else{
        setaddressError(
          null
        )
        flag=true
      }      
      setData({
          ...data,
          address: e.target.value
      })
      return flag;
    };

    const validateCity = (e) => {
      const city = e.target.value;
      let flag=false;

      if(city===""){
        setcityError(
          "City Name cannot be Empty"
        )
      }  
      else{
        setcityError(
          null
        )
        flag=true
      }     
      setData({
          ...data,
          city: city
      })
      return flag;
    };

    const validatePincode = (e) => {
      const pincode = e.target.value;
      let flag=false;


       if (pincode === "") {
          setpincodeError(
           "Pincode cannot be empty"
          );
        }
        else if(pincode.length>6){
            setpincodeError(
                "Invalid Pincode!!"
            );
        }
        else if(pincode.length<6){
          setpincodeError(
            "Invalid Pincode!"
          );
        } 
        else {
          setpincodeError(null);
          flag=true
        } 
        setData({
            ...data,
            pincode: e.target.value,
        });
        return flag;
    };
  
    const validateYear = (e) => {
      let flag=false;
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
       flag=true
      }
      setData({
        ...data,
        yearOfBirth: e.target.value,
      });
      return flag;
    };

    return (         
        isLoaded?(  
        requestError?
        <Dialog
        isShowing={requestError} 
        onOK={() => {
            setRequestError(false)
            //history.push("/home/requester") 
        }} 
        msg={requestError} />
        :       
        <div className={styles.requesterProfileContainer}>
             {
               isProfileUpdated &&
               <nav style={{
                 height:'30px',
                 background:'grey',
                 display:'flex',
                 justifyContent:'center',
                 alignItems:'center',
                 width:'100%',
                 padding:'0px',
                 marginBottom:'-10px'
                 }}>Profile Updated Successfully</nav>

             }

            <Navbar back={"/my_profile"} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
                        
            <form className={styles.editProfileForm} onSubmit={submit}>
                
                <img className={styles.profileImage} src={data.profilePhoto}></img>

                <InputField                 
                value={data.fullName}
                type = "text"
                maxLength ="40"
                placeholder="Name"
                error={fullNameError}
                onChange={validateName}                
                />

                <InputField
                value={data.phoneNumber}
                type="number"
                maxLength="10"
                placeholder="Mobile Number"
                error={ phoneNumberError}
                onChange={validatePhNumber}            
                />

                <InputField
                value={data.yearOfBirth}
                type="number"
                maxLength="4"
                placeholder="Year Of Birth"
                error={ yearOfBirthError}
                onChange={validateYear}
                />

                <div className={styles.address}>
                    <div className={styles.completeAddress}>
                        <TextArea                
                        value={data.address}
                        placeholder="Address"
                        rows="3"
                        onChange={validateAddress}
                        error={ addressError}
                        />
                    </div>

                    <div className={styles.city}>
                        <InputField
                          value={data.city}
                          type="text"
                          placeholder="City"
                          error={cityError}
                          onChange={validateCity}
                          />                        
                    </div>

                    <div className={styles.pincode}>
                        <InputField 
                        value={data.pincode}
                        type="number"
                        placeholder="Pincode"
                        error={ pincodeError}
                        onChange={validatePincode}
                        />
                    </div>  

                </div>       
            </form>
              
            <button onClick={(e)=>submit(e)} className="submit">Save Changes</button>

        </div> 
        
        ):
        <LoadingScreen /> 
        );
      };
  
export default EditRequesterProfile;
  
