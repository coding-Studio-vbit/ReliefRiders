import React, { useState } from 'react'
import './loginStyles.css'
import Logo from '../../../global_ui/logo'
import InputField from '../../../global_ui/input';
import VerifyOTP from '../otp/verify_otp';

function Login() {
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [showOTP, setShowOTP] = useState(false)
    
    const validate=(input)=>{
        const pattern =new RegExp(/^[6-9]\d{9}$/);
        if(mobile==''){
            setError("Mobile number cannot be empty");
            return false;
        }
        if(!pattern.test(input)){
            setError("Please enter a valid number");
            return false;
        }
        setError(null)
        return true; 
    }

    const handleLogin=(e)=>{
        setIsDisabled(true);
        setError(null);
        e.preventDefault();
        if(validate(mobile)){
            setError(null)
            console.log("");
            //succesful validation
            //login begins
            setShowOTP(true);
        }
        setIsDisabled(false)
        
    }
    return (
        <div className="login">
            {/* Logo */}
            <Logo/>

            {/*Form and Content*/}
            {
                !showOTP?
            <div className="content">
                <h1>Requester Login</h1>
                
                    <InputField 
                    type="text" 
                    placeholder="Mobile"
                    error={ error?error:""}
                    value={ mobile }
                    maxLength="10"
                    
                    onChange={ 
                        (e)=>setMobile(e.target.value)
                    }                    
                    />


                    <button 
                    type="submit" 
                    onClick={(e)=>handleLogin(e)}

                    value="Request OTP" 
                    className="btnStyle"
                    disabled={ isDisabled }
                    >Request OTP</button>  
            
                              

                <p className="routetext">Dont have an account?</p>

                <button 
                className="btnStyle register"                 
                >Go to Registration</button>

            </div>
            : <VerifyOTP/>
            }

            
            
        </div>
    )
}

export default Login
