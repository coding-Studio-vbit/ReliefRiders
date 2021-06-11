import React from "react";
import {useHistory,Link,BrowserRouter as Router} from 'react-router-dom'
import "./style.css";
import Logo from './../../global_ui/logo'

function RequesterHomeScreen() {   
    const history =useHistory()
    const logoutHandler=()=>{
        localStorage.clear();
        history.push('./')
    }
  return (
    <Router>
      <section className="container">
      <h1 className="header">HOME</h1>
      <div className="logo">
        <Logo/>
      </div>
        <Link className="link" to="">
      <button className="btn">
        <span className="btn__icon">
        <i class="fas fa-plus"></i>
        </span>
        <span className="btn__text">Place New Request</span>
      </button>
      </Link>
      <Link className="link" to="">
      <button className="btn">
        <span className="btn__icon">
        <i class="fas fa-align-justify"></i>
          </span>
        <span className="btn__text">My Requests</span>
      </button>
      </Link>
      <Link className="link" to="">
      <button className="btn">
          <span className="btn__icon">
          <i class="fas fa-user"></i>
          </span>
          <span className="btn__text">My Profile</span>
      </button>
      </Link>
      <button className="btn" onClick={logoutHandler}>
          <span className="btn__icon">
          <i class="fas fa-arrow-right"></i>
          </span>
          <span className="btn__text">LogOut</span>
      </button>
      </section>
    </Router>
  );
    
    
    
}

export default RequesterHomeScreen
