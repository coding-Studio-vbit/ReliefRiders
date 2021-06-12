import React from "react";
import {useHistory} from 'react-router-dom';
import Logo from "../global_ui/logo";
import "./RiderHome.css";
function RiderHome() {   
    const history =useHistory()

    const logoutHandler=()=>{
        localStorage.clear();
        history.push('./')
    }

  return (
    <div>
      <nav className="navi">
            <h3>
                  HOME
            </h3>
        </nav> 

      <section className="riderhome">
      <div className="logo">
          <Logo />
        </div>

        <div className="Rider_Home_Body">

          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-plus"></i>
            </span>
            <span className="btn_text">Make New Delivery</span>
          </button>

          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-exclamation-circle"></i>
            </span>
            <span className="btn_text">Current Request</span>
          </button>

          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-list-ul"></i>
            </span>
            <span className="btn_text">My Deliveries</span>
          </button>

          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-user"></i>
            </span>
            <span className="btn_text">My Profile</span>
          </button>

          <button className="buttons" onClick={logoutHandler}>
            <span className="btn_icon">
            <i className="fas fa-sign-out-alt"></i>
            </span>
            <span className="btn_text">Logout</span>
          </button>
          </div>
      </section>
      </div>

  );
}

export default RiderHome;
