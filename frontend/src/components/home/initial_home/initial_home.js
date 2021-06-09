import React from "react";
import Logo from "../../global_ui/logo";
import TopBanner from "./top-banner";
// import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { LeaderBoard } from "./leaderboard";

import './initial-home.css'
const InitialHome = () => {
    return (
        <div className="ih-container">
            <TopBanner />
            <div className="contents-ih">

                <Logo />
                <p style={{ marginTop: 0.5 + 'em' }} >Hey</p>
                <p  >How can we help you?</p>
                <button className="loginasrider-btn">
                    Login as Requester
                </button>
                <button className="loginasrider-btn">
                    Login as Rider
                </button>
            </div>
            <LeaderBoard />

        </div>
    );
}

export default InitialHome;