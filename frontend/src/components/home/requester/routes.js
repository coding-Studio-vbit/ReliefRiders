import React from 'react';
import { Route, Switch } from 'react-router';
import RequesterHomeScreen from './RequesterHomeScreen';
const RequesterHomeRoutes = () => {
    return ( 
        <Switch>
            <Route path="/">
                <RequesterHomeScreen/>
            </Route>
            <Route path="/my_requests" >
                MyRequestsHere
            </Route>
            <Route path="/new_request" >
                NewRequestHere
            </Route>
            <Route path="/my_profile" >
                MyProfileHere
            </Route>
        </Switch>
     );
}
 
export default RequesterHomeRoutes;