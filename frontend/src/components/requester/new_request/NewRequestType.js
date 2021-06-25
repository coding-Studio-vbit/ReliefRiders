import React from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../../global_ui/logo'
import RequestTypeCSS from './RequestType.module.css'
import Navbar from '../../global_ui/nav';


function RequestType() {
  const history = useHistory();

  const routehandler = (route) => {
    history.push(route);
  };
  
    return(
      <div>
        <div className={'row'}>
			    <Navbar back='/' backStyle={{ color: "white" }} title="Choose Request Type" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
 		    </div>
        <div className={RequestTypeCSS.container}>
          <Logo />
          <button onClick={() => routehandler("list_type")} className={RequestTypeCSS.btn2}>
            <span className={RequestTypeCSS.i2}>
            <span className={RequestTypeCSS.box}>
              <i className='fas fa-plus'></i>
            </span>
            </span>
            <span className={RequestTypeCSS.btn2Text}>
              General Request
            </span>
          </button>
          <button onClick={() => routehandler("list_type")} className={RequestTypeCSS.btn2}>
            <span className={RequestTypeCSS.icon2}>
              <span className={RequestTypeCSS.i3}>
              <i className='fas fa-truck-pickup'></i>
              </span>
            </span>
            <span className={RequestTypeCSS.btn2Text}>
              Pick Up / Drop
            </span>
          </button>
        </div>
      </div>
    )
}



export default RequestType;
