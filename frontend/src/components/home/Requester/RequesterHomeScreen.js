import React from "react";
import {useHistory} from 'react-router-dom'
import "./style.css";
import Logo from './../../global_ui/logo'

function RequesterHomeScreen() {   
    const history =useHistory()

    const logoutHandler=()=>{
        localStorage.clear();
        history.push('./')
    }

    const routehandler=(actionType)=>{
      history.push({actionType});     
    }

    return (
      <div>

        <nav 
        style={{
            backgroundColor:'green',
            width:'100%',
            height:'60px',
            textAlign:'center',
            display:'grid',
            alignContent:'center',
            alignItems:'center',
            fontSize:'20px',
            color:'white'
        }}>
            <h3>
                  HOME
            </h3>
        </nav> 

        <section className="container">

          <div style={{ margin:'15px auto'}}>
            <Logo/>
          </div>
          
          <div className="content">

            <button className="btn" onClick={()=>routehandler('placenewrequest')}>
              <span className="btn__icon">
                <i className="fas fa-plus"></i>
              </span>
              <span className="btn__text">Place New Request</span>
            </button>        
          
            <button className="btn" onClick={()=>routehandler('myrequests')}>
              <span className="btn__icon">
                <i className="fas fa-list-ul"></i>
              </span>
              <span className="btn__text">My Requests</span>
            </button>        
          
            <button className="btn" onClick={()=>routehandler('myprofile')}>
                <span className="btn__icon">
                  <i className="fas fa-user"></i>
                </span>
                <span className="btn__text">My Profile</span>
            </button>          

            <button className="btn" onClick={logoutHandler}>
                <span className="btn__icon">
                <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="btn__text">LogOut</span>
            </button>           

          </div>
        </section>
      </div>        
    );       
}

export default RequesterHomeScreen;
