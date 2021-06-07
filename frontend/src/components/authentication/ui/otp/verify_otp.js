/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import './verify_otp.css'
import InputField from '../../../global_ui/input'
import { AuthContext, verify } from '../../../context/auth/authProvider';
import Spinner from '../../../global_ui/spinner';
import Requester from '../../../../models/requester';
const VerifyOTP = ({user,mobile}) => {
    const [otp,setOtp] = useState('')
    const [error,setError] = useState({
        error:'Please enter OTP',
        showError:false
    })
    const {dispatch,loading,isRequester} = useContext(AuthContext)
    const submit =  async()=>{
        setError({...error,showError:true})
        if(!error.error){
            if(isRequester){
                const user = new Requester(mobile,"Dummy")
                await verify(dispatch,otp,user)

            }else{
                await verify(dispatch,otp,user)
 
            }
        }
        
            

        
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
            {loading?
                                <Spinner radius="2"/>:<button onClick={submit} className="verify-btn" >Verify</button> }
            
            <p style={{textAlign:'center',marginBottom:0.3+'em'}} >Entered wrong details <button onClick={goBack} className="go-back-reg" >Go back</button>  </p>
        </div >
     );
}
 
export default VerifyOTP;