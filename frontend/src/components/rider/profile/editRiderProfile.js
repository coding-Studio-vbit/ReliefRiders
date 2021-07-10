import React,{useState,useEffect} from "react";
import styles from "./editRiderProfile.module.css";
import axios from 'axios';
import InputField from "../../global_ui/input";
import Navbar from "../../global_ui/nav";
import {Dialog} from '../../global_ui/dialog/dialog';
import {LoadingScreen} from '../../global_ui/spinner';
import { useHistory } from "react-router";

const EditRiderProfile = () => {
  const history =useHistory();

  const [requestError, setRequestError] = useState(null);
  const token = localStorage.getItem('token');
  const [isLoaded,setisLoaded] = useState(false);
  const [isProfileUpdated, setisProfileUpdated] = useState(false);

  const [data, setData] = useState({
    profileURL:"",
    name:"",
    phoneNumber:"",       
  });  

  const [fullNameError, setfullNameError] = useState(null);
  const [phoneNumberError, setphoneNumberError] = useState(null); 

  async function showSnackBar(){
    setTimeout(() => {
      setisProfileUpdated(false)
    }, 3000);    
  }

  useEffect(
    async () => {
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
        axios.get('http://localhost:8000/rider/profile',options)
        .then(response => {
            if(response.data.status==="success"){
              console.log(response);
              setData({
                name:response.data.message.name,
                phoneNumber:response.data.message.phoneNumber,
                profileUrl:response.data.message.profileUrl
            })
            setRequestError(null);
            }
            else{
              setRequestError(response.data.message)
            }            
            setisLoaded(true);
        }, error => {
            console.log("An error occured", error);
            setRequestError(error.message);
            setisLoaded(true);
        })
}, [])

  function updateProfile(){
    setisLoaded(false)
    const options={
      headers: {
        'authorization': 'Bearer ' + token
      }
    }

    axios.put('http://localhost:8000/rider/profile',data,options)   
    .then(response =>{
      console.log(response);
      if(response.data.status==="success"){
        console.log("Profile Updated");
        setRequestError(null);
        setisProfileUpdated(true);
        showSnackBar();
        history.replace("/my_profile")
      }
      else{
        setRequestError(response.data.message)
      }
      setisLoaded(true);    

      })
    .catch((error)=>{
      setRequestError(error.message)
      setisLoaded(true)
    })
 }

 const submit = (event)=>{
   event.preventDefault();
   const d = data;

   if(validateName({target:{value:d.name}}) & validatePhoneNumber({target:{value:d.phoneNumber}})){
    updateProfile();
    }
  }
  
 const validatePhoneNumber = (e) => {
   let flag=false;
  const phoneNumber = e.target.value;
  const regE = /^[6-9]\d{9}$/;
  if (phoneNumber.length > 10) {
    setphoneNumberError(
      "Phone number exceeds 10 digits"
      );
  } 
  else if (!regE.test(phoneNumber)) {
    setphoneNumberError(
      "Enter a valid mobile number"
      );
  } 
  else {
    setphoneNumberError(
      null
      );
      flag=true
    }
    
  setData({
    ...data,
    phoneNumber: e.target.value,
  }); 
  return flag;
};
  
const validateName = (e) => {
  let flag=false
  const fullName = e.target.value;
  if (fullName === "") {
    setfullNameError(
      "Enter your name"
    );
  }
  else if (fullName.length < 3) {
    setfullNameError(
      "Name must be atleast 3 characters!"
   );
  }
  else if (fullName.length > 16) {
    setfullNameError(
      "Name must not exceed 16 characters!"
   );
  } 
  else if (!/^[a-zA-Z .]{3,16}$/
  .test(fullName)) {
    setfullNameError(
      "Name can only contain alphabets"
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
    name: e.target.value,
  }); 
  return flag 
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
        <div className={styles.riderProfileContainer}>

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
                 marginBottom:'-13px'
                 }}>Profile Updated Successfully</nav>

             }
                        
            <Navbar 
            back={"/my_profile"} 
            backStyle={{ color: 'white' }} 
            title="My Account" titleStyle={{ color: 'white' }} 
            style={{ backgroundColor: '#79CBC5', marginBottom: "8px" }} />          
            
            <form className={styles.editRiderProfileForm} onSubmit={submit}> 
                <img className={styles.profileImage} src={data.profileURL}></img>

                <InputField 
                value={data.name}
                type = "text"
                maxLength ="40"
                placeholder="Enter your name"
                error={fullNameError}
                onChange={(e)=>validateName(e)}/>

                <InputField
                  value={data.phoneNumber}
                  type="number"
                  maxLength="10"
                  placeholder="Mobile Number"
                  error={phoneNumberError}
                  onChange={(e)=>validatePhoneNumber(e)}/> 

                <div className={styles.filler}></div>                 

                <button onClick={(e)=>submit(e)} className={styles.btn}>Save Changes</button>     

            </form>

        </div> 
        ):
        <LoadingScreen />

    );
  };
  
  export default EditRiderProfile;