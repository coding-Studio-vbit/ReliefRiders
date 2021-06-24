import React from 'react';
import {useState } from "react";
import "./editRiderProfile.css";
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";

const EditRiderProfile = () => {
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
            
            axios.put('http://localhost:8000/rider/profile',options)
                  .then(response => setData(response.data));
          
          
            }, error => {
                console.log("An error occured", error);
                setError();
            })
    
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
    


  
    return (
        
        <div className="riderProfile-container">
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
        
        
        
          </form>
          <button onClick={submit} className="submit">Save Changes</button>
          </div>
  
        
        
    );
  };
  
  export default EditRiderProfile;