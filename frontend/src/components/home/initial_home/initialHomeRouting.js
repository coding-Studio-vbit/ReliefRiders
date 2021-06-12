import React, { useContext, useEffect } from "react";
import {
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";
import Login from "../../authentication/ui/login/login";
import VerifyOTP from "../../authentication/ui/otp/verify_otp";
import RegisterScreen from "../../authentication/ui/register/register_form";
import { AuthContext } from "../../context/auth/authProvider";
import RiderHome from "../Rider/RiderHome";
import RequesterHomeScreen from "../Requester/RequesterHomeScreen";
import InitialHome from "./initial_home";
const InitialHomeRouting = () => {

    const {dispatch,isAuthenticated} = useContext(AuthContext)
    const route = useHistory()
    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token)
        {
            const user = JSON.parse( localStorage.getItem('user'))

            dispatch({
                type:"AUTHENTICATED",
                payload:{token,user}
            })
            route.push(`/home/${user.isRequester?"requester":"rider"}`)

        }
        
    },[])

    return (
        <Switch>
            <ProtectedRoute isAuthenticated={isAuthenticated}  path="/home/requester">
              <RequesterHomeScreen />
            </ProtectedRoute>
            <ProtectedRoute isAuthenticated={isAuthenticated} path="/home/rider">
              <RiderHome/>
            </ProtectedRoute>
            <Route path="/login/:user"

            >
                <Login></Login>
            </Route>
            <Route path="/verify" exact render={(match)=>{
                if(!match.location.state){
                    return <Redirect to="/"/>
                }else return <VerifyOTP/>
            }} />
       
            <Route path="/register/:user"

            >
                <RegisterScreen></RegisterScreen>
            </Route>
            <Route path="/">
                
               <InitialHome/>
            </Route>
        </Switch>
    );
}

export default InitialHomeRouting;

const ProtectedRoute = ({isAuthenticated,children,path})=>{
    if(isAuthenticated){
        return <Route path={path} > {children}</Route>
    }else{
        return <Redirect to="/" />
    }
}