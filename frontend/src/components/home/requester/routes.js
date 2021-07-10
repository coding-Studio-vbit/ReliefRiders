import React from "react";
import { Route, Switch } from "react-router";
import RequesterHomeScreen from "./RequesterHomeScreen";
import { BrowserRouter } from "react-router-dom";
import MyRequestsRoutes from "../../requester/my_requests/my_requests_routes";
import NewRequestRoutes from "../../requester/new_request/new_request_routes";
import RequesterProfileRoutes from "../../requester/profile/profileRouting";
import { NewRequestProvider } from "../../context/new_request/newRequestProvider";

const RequesterHomeRoutes = () => {
  return (
    <BrowserRouter basename="/home/requester">
      <Switch>
        <Route path="/my_requests">
          <MyRequestsRoutes />
        </Route>
        
        <Route path="/my_profile">
          <RequesterProfileRoutes/>        
        </Route>

        <Route path="/new_request">
        <NewRequestProvider>
          <NewRequestRoutes />
          </NewRequestProvider>
        </Route>

        <Route path="/">
          <RequesterHomeScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RequesterHomeRoutes;
