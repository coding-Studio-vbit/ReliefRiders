import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../../authentication/ui/login/login";
import VerifyOTP from "../../authentication/ui/otp/verify_otp";
import RegisterScreen from "../../authentication/ui/register/register";
import InitialHome from "./initial_home";
const InitialHomeRouting = () => {

    //navigate to home or initial home

    return (
        <Switch>
            <Route path="/login/:user"

            >
                <Login></Login>
            </Route>
            <Route path="/verify">
          <VerifyOTP></VerifyOTP>
        </Route>
            <Route path="/register/:user"

            >
                <RegisterScreen></RegisterScreen>
            </Route>
            <Route path="/">
                <InitialHome />
            </Route>
        </Switch>
    );
}

export default InitialHomeRouting;