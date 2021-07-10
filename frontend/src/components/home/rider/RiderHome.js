import React, { useContext } from "react";

import { AuthContext } from "../../context/auth/authProvider";
import { logout } from "../../context/auth/authOperations";

import "../Requester/style.css";
import { useHistory } from "react-router-dom";
import Logo from "../../global_ui/logo";
import Navbar from "../../global_ui/nav";
function RiderHome() {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const routehandler = (route) => {
    history.push( route );
  };




  return (
    <div className="rider-home-container">
      <Navbar title="HOME" />
      <div className="riderhome">
        <Logo />
        <button  onClick={()=>routehandler("/new_delivery")} className="rider-home-btn">
          <i className="fas fa-plus"></i>
          Make New Delivery
        </button>
        <button onClick={()=>routehandler("/current_request")} className="rider-home-btn">
          <i className="fas fa-exclamation-circle"></i>
          Current Request
        </button>
        <button onClick={()=>routehandler("/my_deliveries")} className="rider-home-btn">
        <i className="fas fa-list-ul"></i>
          My Deliveries
        </button>
        <button onClick={()=>routehandler("/my_profile")} className="rider-home-btn">
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

export default RiderHome;
