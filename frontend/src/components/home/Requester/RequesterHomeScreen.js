import React, { useContext } from "react";
import {useHistory} from 'react-router-dom'
import "./style.css";
import Logo from './../../global_ui/logo'
import Navbar from "../../global_ui/nav";
import { AuthContext } from "../../context/auth/authProvider";
import { logout } from "../../context/auth/authOperations";

function RequesterHomeScreen() {   
    const history =useHistory()
    const {dispatch} = useContext(AuthContext)

    // const routehandler=(actionType)=>{
    //   history.push({actionType});     
    // }

  
      return (
        <div className="rider-home-container">
        <Navbar title="HOME" />
        <div className="riderhome">
    
        <Logo />
              <button className="rider-home-btn">
                <i className="fas fa-plus"></i>
                Place new Request
              </button>
              <button className="rider-home-btn">
                <i className="fas fa-exclamation-circle"></i>
                My Requests
              </button>
              
              <button className="rider-home-btn">
                <i className="fas fa-user"></i>
                My Profile
              </button>
              <button onClick={()=>{logout(dispatch); history.push('/')}}  className="rider-home-btn">
              <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
          </div>
    </div>
      );  
    
}

export default RequesterHomeScreen;
