import React from "react";
import { Link } from "react-router-dom";

import Logo from "../global_ui/logo";
import "./RiderHome.css";
function RiderHome() {
  return (
      <section className="riderhome">
      <div className="logo">
          <Logo />
        </div>
        <Link className="links">
          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-plus"></i>
            </span>
            <span className="btn_text">Make New Delivery</span>
          </button>
        </Link>
        <Link className="links">
          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-exclamation-circle"></i>
            </span>
            <span className="btn_text">Current Request</span>
          </button>
        </Link>
        <Link className="links">
          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-align-justify"></i>
            </span>
            <span className="btn_text">My Deliveries</span>
          </button>
        </Link>
        <Link className="links">
          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-user"></i>
            </span>
            <span className="btn_text">My Profile</span>
          </button>
        </Link>
        <Link className="links">
          <button className="buttons">
            <span className="btn_icon">
            <i className="fas fa-arrow-right"></i>
            </span>
            <span className="btn_text">Logout</span>
          </button>
        </Link>
      </section>

  );
}

export default RiderHome;
