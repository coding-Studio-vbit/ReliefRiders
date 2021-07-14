import React from "react";
import { useHistory } from "react-router-dom";
import ItemListTypeCSS from "./ItemListType.module.css";
import Navbar from "../../global_ui/nav";

function ListType() {
  const history = useHistory();
  const routehandler = (route) => {
    history.push(route);
  };

  return (
    <div style={{height:'100vh'}}>
      <Navbar back="/new_request" title="New Request" />

      <div className={ItemListTypeCSS.container}>
        <span className={ItemListTypeCSS.headText}>
          Please choose the items you want to request
        </span>
        <button
          onClick={() => routehandler("add_image")}
        >
          Upload Image
        </button>
        <span className={ItemListTypeCSS.headText}>or</span>
        <button
          onClick={() => routehandler("enter_items")}
        >
          Enter Items
        </button>
      </div>
    </div>
  );
}
export default ListType;
