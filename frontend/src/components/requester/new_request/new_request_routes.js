import React, { useRef } from "react";
import { Switch, Route } from "react-router";
import ListType from "./ItemListType";
import { CSSTransition } from "react-transition-group";

import UploadImages from "../../requester/new_request/upload_images";
import EnterItemsForm from "../new_request/enter_items_form/enterItemsForm";
import ChooseAddress from "./choose_address";
import ConfirmRequestGeneral from "../../requester/confirm_request/generalRequestConfirm";
import ConfirmRequestPD from "../../requester/confirm_request/pdRequestConfirm";
import Map from "../../requester/new_request/maps/map";
import RequestType from "../../requester/new_request/NewRequestType";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../../global_ui/fade_transition.css";

const NewRequestRoutes = () => {
  const history = useHistory();
  const nodeRef = useRef(null)
  const location = useLocation();
  useEffect(() => {
    const draft = history.location.pathname;
    const lastPath = localStorage.getItem("draft");
    if (draft === "/new_request") history.replace("/new_request");
    else if (lastPath) history.replace(lastPath, history.location.state);
  }, []);
  return (
  
        <CSSTransition
          appear
          nodeRef={nodeRef}
          in
          key={location.key}
          timeout={250}
          
          classNames="fade"
        >
          <div ref={nodeRef} >
          <Switch ref={nodeRef} location={location}>
            <Route path="/new_request/list_type">
              <ListType />
            </Route>
            <Route path="/new_request/map_location/:pickup">
              <Map />
            </Route>
            <Route path="/new_request/add_image">
              <UploadImages />
            </Route>
            <Route path="/new_request/enter_items">
              <EnterItemsForm />
            </Route>
            <Route key={"jdbwjdbwjdk"} path="/new_request/address_pickup">
              <ChooseAddress pickup={true} />
            </Route>
            <Route key={"qkwje,wjqhj"} path="/new_request/address_drop">
              <ChooseAddress pickup={false} />
            </Route>
            <Route path="/new_request/confirm_general">
              <ConfirmRequestGeneral />
            </Route>
            <Route path="/new_request/confirm_pd">
              <ConfirmRequestPD />
            </Route>
            <Route path="/new_request">
              <RequestType />
            </Route>
          </Switch>
          </div>
        </CSSTransition>
   
  );
};

export default NewRequestRoutes;
