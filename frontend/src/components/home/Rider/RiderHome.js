import React, { useContext } from "react";

import { AuthContext } from "../../context/auth/authProvider";
import { logout } from "../../context/auth/authOperations";

import "../Requester/style.css";
import { useHistory } from "react-router";
import Logo from "../../global_ui/logo";
import Navbar from "../../global_ui/nav";
function RiderHome() {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="rider-home-container">
      <Navbar title="HOME" />
      <div className="riderhome">
        <Logo />
        <button className="rider-home-btn">
          <i className="fas fa-plus"></i>
          Make New Delivery
        </button>
        <button className="rider-home-btn">
          <i className="fas fa-exclamation-circle"></i>
          Current Request
        </button>
        <button className="rider-home-btn">
        <i className="fas fa-list-ul"></i>
          My Deliveries
        </button>
        <button className="rider-home-btn">
          <i className="fas fa-user"></i>
          My Profile
        </button>
        <button
          onClick={() => {
            logout(dispatch);
            history.push("/");
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