import React from 'react';
import { Route, Switch } from 'react-router';
import RiderHome from './RiderHome';
const RiderHomeRoutes = () => {
    return ( 
        <Switch>
            <Route path="/">
                <RiderHome/>
            </Route>
            <Route path="/new_delivery" >
                
            </Route>
            <Route path="/current_request" >
                NewRequestHere
            </Route>
            <Route path="/my_deliveries" >
                MyProfileHere
            </Route>
            <Route path="/my_profile" >
                MyProfileHere
            </Route>
        </Switch>
     );
}
 
export default RiderHomeRoutes;