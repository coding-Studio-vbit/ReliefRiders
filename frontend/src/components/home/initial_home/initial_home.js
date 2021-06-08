import React from "react";
import Logo from "../../global_ui/logo";
import TopBanner from "./top-banner";
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { LeaderBoard } from "./leaderboard";
import './initial-home.css'
const InitialHome = () => {
    return ( 
        <div className="ih-container">
            <TopBanner/>
            <Logo  />
            <span>Hey</span>
            <span>How can we help you?</span>
            <div className="call-btn">
            <CallOutlinedIcon/>
            <span className="nnn" >9999999999</span>
            </div>
            <div className="call-btn">
            <CallOutlinedIcon/>
            <p className="nnn" >9999999999</p><br/>
            </div>
            <LeaderBoard/>

        </div>
     );
}
 
export default InitialHome;