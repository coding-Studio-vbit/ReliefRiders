import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import RiderHome from './RiderHome';
import RiderProfileRoutes from "../../rider/profile/profileRouting";
import { CurrentRequest } from '../../rider/current_request/current_request';
import MyDeliveryRoutes from '../../rider/my_deliveries/my_delivery_routes';

import ChooseRequestRoutes from '../../rider/make_delivery/ChooseRequestRoutes';

const RiderHomeRoutes = () => {
    return ( 
        <BrowserRouter basename="/home/rider">
        <Switch>

            <Route exact path="/">
                <RiderHome/>
            </Route>

            <Route path="/new_delivery" >
                <Route path="/new_delivery" component={ChooseRequestRoutes} />                
            </Route>

            <Route path="/current_request" >
                <CurrentRequest/>
            </Route>

            <Route path="/my_deliveries" >
               <MyDeliveryRoutes/>
            </Route>

            <Route path="/my_profile" >
              <RiderProfileRoutes/>                
            </Route>
        </Switch>
        </BrowserRouter>
     );
}
 
export default RiderHomeRoutes;