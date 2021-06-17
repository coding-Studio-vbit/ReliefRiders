import React from 'react';
import { Route, Switch } from 'react-router';
import RequesterHomeScreen from './RequesterHomeScreen';
import MyRequests from '../../requester/my_requests/MyRequests';

const RequesterHomeRoutes = () => {
    return (
        <Switch>

            <Route path="/requester/myrequests" >
                <MyRequests />
            </Route>
            <Route path="/new_request" >
                NewRequestHere
            </Route>
            <Route path="/my_profile" >
                MyProfileHere
            </Route>
            <Route path="/">
                <RequesterHomeScreen />
            </Route>
        </Switch>
    );
}

export default RequesterHomeRoutes;
