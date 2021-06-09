import React, { useContext, useEffect, useState } from 'react'
import './loginStyles.css'
import Logo from '../../../global_ui/logo'
import InputField from '../../../global_ui/input';
import VerifyOTP from '../otp/verify_otp';
import { AuthContext, requestOTP } from '../../../context/auth/authProvider';
import Spinner from '../../../global_ui/spinner';
import Rider from '../../../../models/rider';
import Requester from '../../../../models/requester';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';

function Login({isRequester}) {
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');
    const {loading,showOTP,dispatch} = useContext(AuthContext)
    
    useEffect(()=>{
        if(!isRequester){
            dispatch({
                type: "ISRIDER", payload: null
            })
        }
    },[])

    const validate = (input) => {
        const pattern = new RegExp(/^[6-9]\d{9}$/);
        if (mobile == '') {
            setError("Mobile number cannot be empty");
            return false;
        }
        if (!pattern.test(input)) {
            setError("Please enter a valid number");
            return false;
        }
        setError(null)
        return true;
    }

    const handleLogin = (e) => {
        setError(null);
        e.preventDefault();
        if (validate(mobile)) {
            setError(null)
            if(isRequester){
                const user = new Requester(mobile,"Dummy")
                 requestOTP(dispatch,user)

            }else{
                 requestOTP(dispatch,new Rider(mobile,"Dummy"))
 
            }
            
        }

    }
    return (
        
            <div className="login">
                {/* Logo */}
                <Logo />

                {/*Form and Content*/}
                {
                    !showOTP ?
                        <div className="content">
                            <h1 > {isRequester?"Requester":"Rider"} Login</h1>

                            <InputField
                                type="text"
                                placeholder="Mobile"
                                error={error ? error : ""}
                                value={mobile}
                                maxLength="10"

                                onChange={
                                    (e) => setMobile(e.target.value)
                                }
                            />

                            {loading ?
                                <Spinner radius="2" /> : <button
                                    type="submit"
                                    onClick={(e) => handleLogin(e)}

                                    value="Request OTP"
                                    className="btnStyle"
                                >Request OTP</button>}





                            <p className="routetext">Dont have an account?</p>

                            <button
                                className="btnStyle register"
                            > 
                            <Link to={isRequester?"/register/requester":"/register/rider"} >Go to Registration</Link>
                            </button>

                        </div>
                        : <VerifyOTP mobile={mobile} />
                }



            </div>
        
    )
}

export default Login
