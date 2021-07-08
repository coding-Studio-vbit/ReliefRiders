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
    <div style={{display:'grid'}}>
      <div className={'row'}>
        <Navbar
          back="/"
          backStyle={{ color: "white", position:"absolute",left:"0" }}
          title="Choose Request Type"
          titleStyle={{ color: "white" ,fontSize:"18px" }}
          style={{ backgroundColor: "#79CBC5", marginBottom: "10px" , display:'flex', position:'relative'}}
        />
      </div>
      <div className={rtstyles.rcontainer}>
        <Logo />
        <button
          onClick={() => {
            dispatch({ type: "REQUEST_TYPE", payload: "general",leftOffRoute:"list_type" });
            routehandler("list_type");
          }}
          className={rtstyles.rbtn2}
        >
          <span className={rtstyles.ri2}>
            <span className={rtstyles.rbox}>
              <i className="fas fa-plus"></i>
            </span>
          </span>
          <span className={rtstyles.rbtn2Text}>General Request</span>
        </button>
        <button
          onClick={() => {
            const route = 'list_type'
            dispatch({ type: "REQUEST_TYPE", payload: "p&d",leftOffRoute:route});

            routehandler(route);
          }}
          className={rtstyles.rbtn2}
        >
          <span className={rtstyles.ricon2}>
            <span className={rtstyles.ri3}>
              <i className="fas fa-truck-pickup"></i>
            </span>
          </span>
          <span className={rtstyles.rbtn2Text}>Pick Up / Drop</span>
        </button>
      </div>
    </div>
  );
}

export default RequestType;
