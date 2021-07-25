import React, { useContext, useEffect, useState } from "react";
import "./loginStyles.css";
import Logo from "../../../global_ui/logo";
import InputField from "../../../global_ui/input";
import { AuthContext } from "../../../context/auth/authProvider";
import { Spinner } from "../../../global_ui/spinner";
import { Link, useHistory, useParams } from "react-router-dom";
import { requestOTPLogin } from "../../../context/auth/authOperations";
import { Dialog } from "../../../global_ui/dialog/dialog";
import User from "../../../../models/user";
function Login() {
  const [mobile, setMobile] = useState("");
  const [errorMsg, setError] = useState("");
  const { loading, dispatch, error } = useContext(AuthContext);

  const route = useHistory();
  const { user } = useParams();
  let isRequester = user === "rider" ? false : true;
  const [isShowing, toggle] = useState(false);

  useEffect(() => {
    if (!isRequester) {
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

  const handleLogin = async (e) => {
    setError(null);
    e.preventDefault();
    if (validate(mobile)) {
      setError(null);
      let res;
      const user = new User("xxx", mobile);

      if (isRequester) {
        res = requestOTPLogin(dispatch, mobile, "requester");
      } else {
        res = requestOTPLogin(dispatch, mobile, "rider");
      }
      res.then((r) => {
        if (r == 1) {
          route.push("/verify", {
            isRequester: isRequester,
            authType: "login",
            user: user,
          });
        } else {
          toggle(true);
        }
      });
    }
  };

  return (
    <form className="login">
      {/* Logo */}
      <i
        style={{
          position: "absolute",
          fontSize:'1.2rem',
          color:'gray',
          top:'3.5%',
          left:'6%'
        }}
        onClick={() => {
          route.replace('/')
        }}
        className="fas fa-chevron-left"
      ></i>
      <Dialog
        isShowing={isShowing}
        onOK={() => {
          toggle(false);
        }}
        msg={error}
      />
      {/*Form and Content*/}

      <Logo />
      <h1> {isRequester ? "Requester" : "Rider"} Login</h1>

      <div
        style={{ width: "min(90%,var(--max-width))", justifySelf: "center" }}
      >
        <InputField
          type="text"
          placeholder="Mobile"
          error={errorMsg ? errorMsg : ""}
          value={mobile}
          maxLength="10"
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div
        style={{
          marginTop: "2.5rem",
        }}
      >
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
      </div>
      <div className="reg-cont">
        <p className="routetext">Dont have an account?</p>

          <Link
            to={{
              pathname: isRequester ? "/register/requester" : "/register/rider",
              state: {
                isRequester: isRequester,
              },
            }}
          >
            <button type='button' className="btnStyle-register">
            Go to Registration
        </button>
          </Link>
      </div>

      <div className="almostFooter"  style={{
        
        marginTop: "1rem" }}>
        <Link to={isRequester?'/login/rider':'/login/requester'} >Not {isRequester? 'Requester? Go to Rider Login' : 'Rider? Go to Requester Login'}</Link>
        <br />
        <Link to='/about' >About Us</Link>
      </div>
    </form>
  );
}

export default Login;
