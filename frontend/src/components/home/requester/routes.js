import React from 'react';
import { Route, Switch } from 'react-router';
import RequesterHomeScreen from './RequesterHomeScreen';
import MyRequests from '../../requester/my_requests/MyRequests';
import { BrowserRouter } from 'react-router-dom';

const RequesterHomeRoutes = () => {
    return (
        <BrowserRouter basename="/home/requester" >
        <Switch>

            <Route path="/my_requests" >
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
        </BrowserRouter>
    );
}

export default RequesterHomeRoutes;
