import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { NewRequestContext } from "../../context/new_request/newRequestProvider";
import Logo from "../../global_ui/logo";
import Navbar from "../../global_ui/nav";
import rtstyles from "./NewRequestType.module.css";

function RequestType() {
  const history = useHistory();
  const { dispatch } = useContext(NewRequestContext);
  const routehandler = (route) => {
    history.push("new_request/" + route);
  };
  
  return (
    <>

      

     
        <Navbar
          back="/"
          title="Choose Request Type"
          style={{
            
          }}
        />
    
      <div className={rtstyles.rcontainer}>
        <Logo />
        <button
          onClick={() => {
            dispatch({ type: "REQUEST_TYPE", payload: "general" });
            routehandler("list_type");
          }}
         
        >
         
            
           
          General Request
        </button>
        <button
          onClick={() => {
            const route = 'list_type'
            dispatch({ type: "REQUEST_TYPE", payload: "p&d"});

            routehandler(route);
          }}
        
        >
          
          Pickup / Drop
        </button>
      </div>
    </>
  );
}

export default RequestType;
