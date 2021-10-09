import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Login from "../../authentication/ui/login/login";
import VerifyOTP from "../../authentication/ui/otp/verify_otp";
import RegisterScreen from "../../authentication/ui/register/register_form";
import { AuthContext } from "../../context/auth/authProvider";
import { LoadingScreen } from "../../global_ui/spinner";
import RequesterHomeRoutes from "../requester/routes";
import RiderHomeRoutes from "../rider/routes";
import InitialHome from "./initial_home";
import "../../global_ui/fade_transition.css";
import About from "../../about/about";

const InitialHomeRouting = () => {
    const { dispatch, isRequester, isAuthenticated } = useContext(AuthContext);
  const nodeRef = useRef(null)
    const location = useLocation()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));

            dispatch({
                type: "AUTHENTICATED",
                payload: { token, user },
            });
        } else
            dispatch({
                type: "UNAUTHENTICATED",
            });
    }, []);

    return isAuthenticated === null ? (
        <LoadingScreen />
    ) : (
        <CSSTransition
        appear
          nodeRef={nodeRef}
          in
          key={location.key}
          timeout={250}
          
          classNames="fade"
        >
        <div ref={nodeRef} >
            <Switch location={location} >
            <Route path="/about">
              <About />
            </Route>
                <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    path="/home/requester"
                >
                    <RequesterHomeRoutes/>
                </ProtectedRoute>
                <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    path="/home/rider"
                >
                    <RiderHomeRoutes />
                </ProtectedRoute>
                <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    path="/login/:user"
                >
            
                    <Login />
                </ProtectedRoute>
                <Route
                    path="/verify"
                    exact
                    render={(match) => {
                        if (!match.location.state) {
                            return <Redirect to="/" />;
                        } else return <VerifyOTP />;
                    }}
                />
                <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    path="/register/:user"
                >
                    <RegisterScreen />
                </ProtectedRoute>
                <Route path="/">
            
                    {isAuthenticated ? (
                        <Redirect
                            to={`/home/${isRequester ? "requester" : "rider"}`}
                        />
                    ) : (
                        <InitialHome />
                    )}
                </Route>
            </Switch>
        </div>
        </CSSTransition>
    );
};

export default InitialHomeRouting;

const ProtectedRoute = ({ isAuthenticated, children, path }) => {
    if (isAuthenticated) {
        return (
            <Route path={path}>
                
                {children}
            </Route>
        );
    } else {
        return <Redirect to="/" />;
    }
};
