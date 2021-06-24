import React, { useContext } from "react";
import Logo from "../../global_ui/logo";
import TopBanner from "./top-banner";
import { LeaderBoard } from "./leaderboard";

import './initial-home.css'
import {  useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth/authProvider";
const InitialHome = () => {
    const routes = useHistory()
      const { dispatch} = useContext(AuthContext);
    const goToLoginRider= ()=>{
        dispatch({
            type:"ISRIDER",
            payload:null
        })
        routes.push('/login/rider')
    }
    const goToLoginRequester= ()=>{
        routes.push('/login/requester')
    }

    return (
        <div className="ih-container">
            <TopBanner />
            <div className="contents-ih">

                <Logo />
                <span >Hey</span>
                <p  >How can we help you?</p>
                
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
}

export default InitialHome;