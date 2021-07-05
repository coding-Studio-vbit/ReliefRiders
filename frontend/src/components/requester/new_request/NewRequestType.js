import React from 'react';
import { useHistory } from "react-router-dom";
import Logo from '../../global_ui/logo'
import Navbar from '../../global_ui/nav';
import rtstyles from './NewRequestType.module.css'


function RequestType() {
  const history = useHistory();

  const routehandler = (route) => {
    history.push(route);
  };
  
    return(
      <div>
        <div className={'row'}>
			    <Navbar back='/requester' backStyle={{ color: "white" }} title="Choose Request Type" titleStyle={{ color: "white" }} style={{ backgroundColor: "#79CBC5", marginBottom: "10px" }}/>
 		    </div>
        <div className={rtstyles.rcontainer}>
          <Logo />
          <button onClick={() => routehandler("list_type")} className={rtstyles.rbtn2}>
            <span className={rtstyles.ri2}>
            <span className={rtstyles.rbox}>
              <i className='fas fa-plus'></i>
            </span>
            </span>
            <span className={rtstyles.rbtn2Text}>
              General Request
            </span>
          </button>
          <button onClick={() => routehandler("list_type")} className={rtstyles.rbtn2}>
            <span className={rtstyles.ricon2}>
              <span className={rtstyles.ri3}>
              <i className='fas fa-truck-pickup'></i>
              </span>
            </span>
            <span className={rtstyles.rbtn2Text}>
              Pick Up / Drop
            </span>
          </button>
        </div>
      </div>
    )
}



export default RequestType;
