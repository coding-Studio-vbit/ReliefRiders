import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Logo from "../global_ui/logo";
import "./RiderHome.css";
function RiderHome() {
  return (
    <Router>
      <section className="riderhome">
      <h1 className="navi">HOME</h1>
      <div className="logo">
          <Logo />
        </div>
        <Link className="links">
          <button class="buttons">
            <span className="btn_icon">
            <i class="fas fa-plus"></i>
            </span>
            <span className="btn_text">Make New Delivery</span>
          </button>
        </Link>
        <Link className="links">
          <button class="buttons">
            <span className="btn_icon">
            <i class="fas fa-exclamation-circle"></i>
            </span>
            <span className="btn_text">Current Request</span>
          </button>
        </Link>
        <Link className="links">
          <button class="buttons">
            <span className="btn_icon">
            <i class="fas fa-align-justify"></i>
            </span>
            <span className="btn_text">My Deliveries</span>
          </button>
        </Link>
        <Link className="links">
          <button class="buttons">
            <span className="btn_icon">
            <i class="fas fa-user"></i>
            </span>
            <span className="btn_text">My Profile</span>
          </button>
        </Link>
        <Link className="links">
          <button class="buttons">
            <span className="btn_icon">
            <i class="fas fa-arrow-right"></i>
            </span>
            <span className="btn_text">Logout</span>
          </button>
        </Link>
      </section>
      </Router>

  );
}

export default RiderHome;
