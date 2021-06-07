import React from 'react';
import { AuthContext, AuthProvider } from '../../../context/auth/authProvider';
import Logo from '../../../global_ui/logo';
import VerifyOTP from '../otp/verify_otp';
import Form from './register_form';
const RegisterScreen = () => {


    return (
        <div>
            <div style={{ height: 1.5 + 'rem' }} ></div>
            <Logo />
            <AuthProvider>
               <AuthContext.Consumer>
                {
                    state => {
                        if(state.showOTP){
                            return <VerifyOTP/>
                        }else{
                            return <Form />
                        }
                    }
                }
                </AuthContext.Consumer>
                </AuthProvider>
        </div>
    );
}

export default RegisterScreen;