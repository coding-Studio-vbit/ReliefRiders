/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import './verify_otp.css'
import InputField from '../../../global_ui/input'
import { AuthContext, verify } from '../../../context/auth/authProvider';
const VerifyOTP = ({user}) => {
    const [otp,setOtp] = useState('')
    const [error,setError] = useState({
        error:'',
        showError:false
    })
    const {dispatch} = useContext(AuthContext)
    const submit =  async()=>{
        setError({...error,showError:true})
        await verify(dispatch,otp,user)
        //TODO
    }
    const validateOTP = (otp)=>{
        if(otp.length == 0){
            setError({...error,error:"Please enter OTP"})
  
        }
        else if(otp.length < 6){
            setError({...error,error:"OTP must contain 6 digits"})
        }else{
            setError({...error,error:""})

        }
        setOtp(otp)
    }
    
    const goBack = ()=>{
        dispatch(
            {
                type:"SHOWFORM",
                action:null
            }
        )
    }
    
    return ( 
        <div className="otp-container">
            <span style={{textAlign:'center',marginBottom:0.3+'em'}} >You will get an OTP via SMS</span>
            <InputField error={error.showError?error.error:""} textAlign="center" placeholder="Enter OTP" type="number"  onChange={(e)=>validateOTP(e.target.value)}   />
            <span>Still haven't received the OTP ? <a onClick={()=>console.log("fff")} className="send-otp-btn" >Resend OTP</a> </span>
            <div style={{ height: 5 + 'rem' }} ></div>

            <button onClick={submit} className="verify-btn" >Verify</button>
            <p style={{textAlign:'center',marginBottom:0.3+'em'}} >Entered wrong number <button onClick={goBack} className="go-back-reg" >Go back</button>  </p>
        </div >
     );
}
 
export default VerifyOTP;