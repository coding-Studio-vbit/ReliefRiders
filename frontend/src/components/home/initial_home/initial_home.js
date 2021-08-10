import React, { useContext } from "react";
import Logo from "../../global_ui/logo";
import TopBanner from "./top-banner";
import { LeaderBoard } from "./leaderboard";

import "./initial-home.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth/authProvider";
const InitialHome = () => {
  const routes = useHistory();
  const { dispatch } = useContext(AuthContext);
  const goToLoginRider = () => {
    dispatch({
      type: "ISRIDER",
      payload: null,
    });
    routes.push("/login/rider");
  };
  const goToLoginRequester = () => {
    routes.push("/login/requester");
  };

  return (
    <div className="ih-container">
      <TopBanner />
      <div className="contents-ih">
        <Logo />
        <span className="aboutUs" >
          The Relief Riders initiative is a voluntary effort by a group of
          cyclists to support the needs of the elderly and the needy in their
          local communities. <Link to='/about' >Know more</Link>
        </span>
        
        <p>How can we help you?</p>

        <button onClick={goToLoginRequester} className="loginasrider-btn">
          Login as Requester
        </button>
        <button onClick={goToLoginRider} className="loginasrider-btn">
          Login as Rider
        </button>
        
      </div>
      <LeaderBoard />
    </div>
  );
};

export default InitialHome;
