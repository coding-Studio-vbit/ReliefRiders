import React from "react";
import Logo from "../../global_ui/logo";
import TopBanner from "./top-banner";
import { LeaderBoard } from "./leaderboard";

import './initial-home.css'
import { useHistory } from "react-router";
const InitialHome = () => {
    const routes = useHistory()
    const goToLoginRider= ()=>{
       
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
                <p style={{ marginTop: 0.5 + 'em' }} >Hey</p>
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