import React from 'react';
import {useState } from "react";
import "./editRequesterProfile.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";

const EditRequesterProfile = () => {
  const history = useHistory();
  const token = localStorage.getItem('token')
    useEffect(
        () => {
            console.log(token)
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            
            axios.put('http://localhost:8000/requester/profile',options)
                  .then(response => setData(response.data));
          
          
            }, error => {
                console.log("An error occured", error);
                setError();
            })

    
  

    
    const [data, setData] = useState({
        profilePhoto: "",
        fullName :"",
        phoneNumber:"",
        yearOfBirth:"",
        address:"",
        city:"",
        pincode:""
    });

    
    
    const [errors, setErrors] = useState({
        
        fullName :"",
        phoneNumber:"",
        yearOfBirth:"",
        address:"",
        city:"",
        pincode:"",
        showError: false
    });
  
     function submit(event) {
      event.preventDefault();
      console.log(data);
      setErrors({
        ...errors,
        showErrors: true,
      });
    }
  
    const validatePhNumber = (e) => {
      const phoneNumber = e.target.value;
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
          phoneNumber: "",
        });
      }
      setData({
        ...data,
        phoneNumber: e.target.value,
      });
    };
  
    const validateName = (e) => {
      const fullName = e.target.value;
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
          fullName: "",
        });
      }
      setData({
        ...data,
        fullName: e.target.value,
      });
    };
    const validateAddress = (e) => {
       
        setData({
            ...data,
            address: e.target.value
        })

    };

    const validateCity = (e) => {
       
        setData({
            ...data,
            city: e.target.value
        })

    };

    const validatePincode = (e) => {
        const pincode = e.target.value;
        if (pincode === "") {
          setErrors({
            ...errors,
    
            pincode: "Please enter Pincode",
          });
        }
        else if(pincode.length>6){
            setErrors({
                ...errors,
                pincode: "Invalid Pincode!",
            });
        } else {
            setErrors({
                ...errors,
                pincode: "",
            });
        } setData({
            ...data,
            pincode: e.target.value,
        });
    };
  
    const validateYear = (e) => {
      console.log(new Date().getFullYear() - 100);
      const year = e.target.value;
      const cyear = new Date().getFullYear();
  
      if (!parseInt(year) || parseInt(year) < cyear - 100) {
        setErrors({
          ...errors,
  
          yearOfBirth: "Invalid Year!",
        });
      } else if (parseInt(year) > cyear - 13) {
        setErrors({
          ...errors,
  
          yearOfBirth: "Invalid Year!",
        });
      } else if (year.length == 0) {
        setErrors({
          ...errors,
  
          yearOfBirth: "Enter Year!",
        });
      } else if (year.length != 4) {
        setErrors({
          ...errors,
  
          yearOfBirth: "Invalid Year",
        });
      } else {
        setErrors({
          ...errors,
          yearOfBirth: "",
        });
      }
      setData({
        ...data,
        yearOfBirth: e.target.value,
      });
    };


    return (
        
        <div className="requesterProfile-container">
            <Navbar back={true} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
            <form className="form" onSubmit={submit}>
          
            <img ></img>
            <InputField 
                value={data.fullName}
                type = "text"
                maxLength ="40"
                placeholder="Enter your name"
                error={errors.showErrors ? errors.fullName : ""}
                onChange={validateName}
                
               
            />
        <InputField
          value={data.phoneNumber}
          type="number"
          maxLength="10"
          placeholder="Enter Phone number"
          error={errors.showErrors ? errors.phoneNumber : ""}
          onChange={validatePhNumber}
          

        
          />
        <InputField
        value={data.yearOfBirth}
        type="number"
        maxLength="4"
        placeholder="Year Of Birth"
        error={errors.showErrors ? errors.yearOfBirth : ""}
        onChange={validateYear}
        />
        <div className="address">
<div className="completeAdress">

        <InputField
        textAreaClass="address1"
        rows='5'
        cols='1'
        fieldType="textarea"
        style={{height:'100px'}}
        value={data.address}
        type="textarea"
        placeholder="Enter your Address"
        onChange={validateAddress}
        />
       
</div>

<div className="city">

        <InputField
        value={data.city}
        type="text"
        placeholder="City"
        onChange={validateCity}
        />
</div>
<div className="pincode">

        <InputField 
        value={data.pincode}
        type="number"
        placeholder="Pincode"
        error={errors.showErrors ? errors.pincode : ""}
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
  
