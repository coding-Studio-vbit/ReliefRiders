import React from "react";
// import { useHistory } from "react-router-dom";
import "./chooseRequest.css";

const ChooseRequestItem = (props) => {
  // const routes = useHistory();
  return (
    <div
      // OnClick={() => {
      //   routes.push("make_delivery/" + props.data.requestNumber, {
      //     request: props.data,
      //   });
      // }}
      className="itemContainer"
    >
      <div className="chooseRequestItem">
        <span className="area">
          <i className="fas fa-map-marker-alt"></i>
          {props.request.pickupLocationAddress.area}
        </span>
        <span className="droparea">
          <i className="fas fa-map-marker-alt"></i>{" "}
          {props.request.dropLocationAddress.area}
        </span>
        <span className="requesterName">
          Requester: ${props.request.requesterName}
        </span>
        <span className="covidStatus">{props.request.covidStatus}</span>{" "}
        {/* add condition for covidStatus*/}
        <span className="requestType">{props.request.requestType}</span>
        {props.data.itemCategories.map((category, index) => {
          switch (category) {
            case "MEDICINES":
              return (
                <span key={index} className="medicines">
                  Medcines
                </span>
              );
            case "GROCERIES":
              return (
                <span key={index} className="groceries">
                  Groceries
                </span>
              );
            case "MISC.":
              return (
                <span key={index} className="misc">
                  Misc.
                </span>
              );
          }
        })}
      </div>
    </div>
  );
};
export default ChooseRequestItem;
