import React from 'react';
import { AuthProvider } from '../../../context/auth/authProvider';
import Logo from '../../../global_ui/logo';
import Form from './register_form';
const RegisterScreen = () => {


    return (
        <div>
            <div style={{ height: 1.5 + 'rem' }} ></div>
            <Logo />
            <AuthProvider>
               <Form/>
                </AuthProvider>
        </div>
    );
}

export default RegisterScreen;