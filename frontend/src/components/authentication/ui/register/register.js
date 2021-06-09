import React from 'react';
import Logo from '../../../global_ui/logo';
import Form from './register_form';
const RegisterScreen = ({isRequester}) => {

    
    return (
        <div>
            <div style={{ height: 1.5 + 'rem' }} ></div>
            <Logo />
            <Form isRequester={isRequester} />
        </div>
    );
}

export default RegisterScreen;