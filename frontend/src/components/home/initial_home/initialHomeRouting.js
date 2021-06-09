import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../../authentication/ui/login/login";
import RegisterScreen from "../../authentication/ui/register/register";
import InitialHome from "./initial_home";
const InitialHomeRouting = () => {
    return (
        <Switch>
            <Route path="/login/:user"
                render={({ match }) => {


                    return <Login isRequester={match.params.user == "rider" ? false : true} ></Login>



                }}
            />

            <Route path="/register/:user"
                render={({ match }) => {

                    return <RegisterScreen isRequester={match.params.user == "rider" ? false : true} ></RegisterScreen>






                }}
            />
            <Route path="/">
                <InitialHome />
            </Route>
        </Switch>
    );
}

export default InitialHomeRouting;