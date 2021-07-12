import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Logo from "../../global_ui/logo";
import Navbar from "../../global_ui/nav";
import { AuthContext } from "../../context/auth/authProvider";
import { logout } from "../../context/auth/authOperations";

function RequesterHomeScreen() {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const routehandler = (route) => {
    history.push(route);
  };

  return (
    <div className="rider-home-container">
      <Navbar title="HOME" style={{background:'white'}} titleStyle={{color:'black'}} />
      <div className="riderhome">
        <Logo />
        <button onClick={() => routehandler("new_request")} className="rider-home-btn">
          <i className="fas fa-plus"></i>
          Place new Request
        </button>
        <button onClick={() => routehandler("my_requests")} className="rider-home-btn">
          <i className="fas fa-exclamation-circle"></i>
          My Requests
        </button>

        <button onClick={() => routehandler("my_profile")} className="rider-home-btn">
          <i className="fas fa-user"></i>
          My Profile
        </button>
        <button
          onClick={() => {
            logout(dispatch);
            history.replace("/");
          }}
          className="rider-home-btn"
        >
           <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
}

export default RequesterHomeScreen;
