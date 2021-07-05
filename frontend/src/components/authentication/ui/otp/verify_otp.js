/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import "./verify_otp.css";
import InputField from "../../../global_ui/input";
import { AuthContext } from "../../../context/auth/authProvider";
import {Spinner} from "../../../global_ui/spinner";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../../../global_ui/logo";
import {
  registerRequester,
  registerRider,
  requestOTPLogin,
  verify,
} from "../../../context/auth/authOperations";
import {Dialog} from "../../../global_ui/dialog/dialog";
const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setError] = useState({
    error: "Please enter OTP",
    showError: false,
  });
  const [isShowing, toggle ] = useState(false);
  const route = useHistory();
  const {
    state: { isRequester, authType, user },
  } = useLocation();
  const { dispatch, loading, error } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    dispatch({
      type: "ISRIDER",
      payload: null,
    }); 
  }, []);
  const submit = () => {
    setError({ ...errorMsg, showError: true });
    if (!errorMsg.error) {
      const res = verify(dispatch, otp, authType, isRequester, user);
      res.then((r) => {
        if (r == 1) {
          

          route.replace(`/home/${isRequester ? "requester" : "rider"}`);
          window.location.reload();
        } else {
          toggle(true);
        }
      });
    }
  };
  
  const validateOTP = (otp) => {
    if (otp.length == 0) {
      setError({ ...errorMsg, error: "Please enter OTP" });
    } else if (otp.length < 6) {
      setError({ ...errorMsg, error: "OTP must contain 6 digits" });
    } else {
      setError({ ...errorMsg, error: "" });
    }
    setOtp(otp);
  };

  const goBack = () => {
    route.goBack()
  };
  const resendOTP = () => {
      let res
    if (authType == "login") {
       res = requestOTPLogin(
        dispatch,
        user.mobile,
        isRequester ? "requester" : "rider"
      );
    } else {
      if (isRequester) {
       res =  registerRequester(dispatch, user);
      } else {
       res = registerRider(dispatch, user);
      }
    }
    res.then((r) => {
        if (r != 1) {
            toggle(true);

        } 
      });
  };

  return (
    <div className="otp-container">
      <Logo></Logo>
      <Dialog  isShowing={isShowing} onOK={()=>{toggle(false)}} msg={error} />
      <p style={{ textAlign: "center", marginBottom: 0.3 + "em" }}  >
        You will get an OTP via SMS
      </p>
      <InputField
        error={errorMsg.showError ? errorMsg.error : ""}
        textAlign="center"
        placeholder="Enter OTP"
        type="number"
        onChange={(e) => validateOTP(e.target.value)}
      />
      <p style={{ textAlign: "center"}} >
        Still haven't received the OTP ?{" "}
        <a onClick={resendOTP} className="send-otp-btn">
          Resend OTP
        </a>{" "}
      </p>
      <div style={{ height: 5 + "rem" }}></div>
      {loading ? (
        <Spinner radius="2" />
      ) : (
        <button onClick={submit} className="verify-btn">
          Verify
        </button>
      )}

      <p style={{ textAlign: "center", marginBottom: 0.3 + "em" }}>
        Entered wrong details{" "}
        <button onClick={goBack} className="go-back-reg">
          Go back
        </button>{" "}
      </p>
    </div>
  );
};

export default VerifyOTP;
