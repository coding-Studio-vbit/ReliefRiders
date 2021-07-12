import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import RiderHome from './RiderHome';
import RiderProfileRoutes from "../../rider/profile/profileRouting";

const RiderHomeRoutes = () => {
    return ( 
        <BrowserRouter basename="/home/rider">
        <Switch>
            <Route exact path="/">
                <RiderHome/>
            </Route>
            <Route path="/new_delivery" >
                newDelivery
            </Route>
            <Route path="/current_request" >
                NewRequestHere
            </Route>
            <Route path="/my_deliveries" >
                MyProfileHere
            </Route>
            <Route path="/my_profile" >
              <RiderProfileRoutes/>                
            </Route>
        </Switch>
        </BrowserRouter>
     );
}
 
export default RiderHomeRoutes;