import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../authentication/ui/login/login";
import VerifyOTP from "../../authentication/ui/otp/verify_otp";
import RegisterScreen from "../../authentication/ui/register/register_form";
import { AuthContext } from "../../context/auth/authProvider";
import { LoadingScreen } from "../../global_ui/spinner";
import RequesterHomeRoutes from "../requester/routes";
import RiderHomeRoutes from "../rider/routes";
import InitialHome from "./initial_home";

const InitialHomeRouting = () => {
  const { dispatch, isRequester } = useContext(AuthContext);
  const [isAuthenticated, setAuth] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: "AUTHENTICATED",
        payload: { token, user },
      });
      setAuth(true);
    } else setAuth(false);
  }, []);

  return isAuthenticated === null ? (
    <LoadingScreen />
  ) : (
    <Switch>
      {isRequester && (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path="/home/requester"
        >
          <RequesterHomeRoutes />
        </ProtectedRoute>
      )}
      {!isRequester && (
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/home/rider">
          <RiderHomeRoutes />
        </ProtectedRoute>
      )}
      <Route path="/login/:user" component={Login} />
        
      <Route
        path="/verify"
        exact
        render={(match) => {
          if (!match.location.state) {
            return <Redirect to="/" />;
          } else return <VerifyOTP />;
        }}
      />

      <Route path="/register/:user" component={RegisterScreen} />
      <Route path="/">
        {isAuthenticated === true && (
          <Redirect to={`/home/${isRequester ? "requester" : "rider"}`} />
        )}
        <InitialHome />
      </Route>
    </Switch>
  );
};

export default InitialHomeRouting;

const ProtectedRoute = ({ isAuthenticated, children, path }) => {
  if (isAuthenticated) {
    return <Route path={path}> {children}</Route>;
  } else {
    return <Redirect to="/" />;
  }
};
