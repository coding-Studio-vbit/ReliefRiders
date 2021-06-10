import React, { useContext, useEffect, useState } from "react";
import "./loginStyles.css";
import Logo from "../../../global_ui/logo";
import InputField from "../../../global_ui/input";
import { AuthContext } from "../../../context/auth/authProvider";
import Spinner from "../../../global_ui/spinner";
import { Link, useHistory, useLocation } from "react-router-dom";
import { requestOTPLogin } from "../../../context/auth/authOperations";
import { Switch, Route } from "react-router-dom";
function Login() {
  const [mobile, setMobile] = useState("");
  const [errorMsg, setError] = useState("");
  const { loading, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const route = useHistory();
  console.log(location.state);
  useEffect(() => {
    if (!location.state.isRequester) {
      dispatch({
        type: "ISRIDER",
        payload: null,
      });
    }
  }, []);

  const validate = (input) => {
    const pattern = new RegExp(/^[6-9]\d{9}$/);
    if (mobile == "") {
      setError("Mobile number cannot be empty");
      return false;
    }
    if (!pattern.test(input)) {
      setError("Please enter a valid number");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = (e) => {
    setError(null);
    e.preventDefault();
    if (validate(mobile)) {
      setError(null);
      let res;
      if (location.state.isRequester) {
        res = requestOTPLogin(dispatch, mobile, "requester");
      } else {
        res = requestOTPLogin(dispatch, mobile, "rider");
      }
      res.then((r) => {
        if (r == 1) {
          route.push("/verify", {
            isRequester: location.state.isRequester,
            authType: "login",
          });
        }else{
          console.log(r);
        }
      });
    }
  };

  return (
    <div className="login">
      {/* Logo */}
      <Logo />

      {/*Form and Content*/}
      <Switch>
        <Route path="/">
          <div className="content">
            <h1> {location.state.isRequester ? "Requester" : "Rider"} Login</h1>

            <InputField
              type="text"
              placeholder="Mobile"
              error={errorMsg ? errorMsg : ""}
              value={mobile}
              maxLength="10"
              onChange={(e) => setMobile(e.target.value)}
            />

            {loading ? (
              <Spinner radius="2" />
            ) : (
              <button
                type="submit"
                onClick={(e) => handleLogin(e)}
                value="Request OTP"
                className="btnStyle"
              >
                Request OTP
              </button>
            )}

            <p className="routetext">Dont have an account?</p>

            <button className="btnStyle register">
              <Link
                to={{
                  pathname: location.state.isRequester
                    ? "/register/requester"
                    : "/register/rider",
                  state: {
                    isRequester: location.state.isRequester,
                  },
                }}
              >
                Go to Registration
              </Link>
            </button>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Login;
