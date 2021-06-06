import React from 'react';
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles' //install @material-ui/core 
import "./otpStyles.css"

const OtpVerify=()=>{

    const [OTP, setOtp] = useState("");
    const [error, setError] = useState("");
    const [seconds, setSeconds] = useState(59);
    const [minutes] = useState(0);    

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(seconds>0){
             setSeconds(seconds -1)
              }}, 1000);

              return ()=>clearTimeout(timer);
      
    });

    const handleOTP = (e)=>{
        e.preventDefault();
        setError(null);
    }
      
    const handleOnchange = (e)=>{
      const re =/^[0-9\b]+$/;
      if(e.target.value === ''||re.test(e.target.value)){
        setOtp(e.target.value);
      }
    };

    const isEnable = OTP.length===6 ;

    const useStyles = makeStyles(() => ({
        
        enabledButton: {
           backgroundColor: '#4CAF50',
           padding: '10px 30px',
           
       },
         defaultButton: {
           backgroundColor: '#cfcfcf',
           padding: '10px 30px',
       },
       }));
       
        const classes = useStyles();

  return (
    <div className="otpverify-screen">               

            
            <img src={window.location.origin+`/assets/logo.png`} alt="Relief Riders relief" className="logo" />           
            
            <div className="container">
            <h1 className="htag">Enter OTP</h1>                    
            
            <p className="otp-msg">You will get an OTP via SMS</p>           
            
            <form
             action=""
             method="post"
             onSubmit={handleOTP}>
            
               <p className="error-msg">{error?error:null}</p>          
                <input
                       type="tel"
                       required
                       placeholder="6-digit otp"                      
                       pattern="[0-9]{6}"
                       onChange={handleOnchange}
                       value = {OTP} 
                       maxLength="6"  
                       
                /> 

            <p className="resend-msg">still havent received an OTP? {seconds===0?<a href="/">Resend</a>:<span>Resend otp in {minutes}:{seconds}</span>}</p>           

            <div className={classes.root}> 
                <Button type="submit" disabled={!isEnable} className={isEnable ? classes.enabledButton : classes.defaultButton}>Verify</Button>
            </div>
            </form>

            </div>
        </div>
        
    );
  
    
}

export default OtpVerify;