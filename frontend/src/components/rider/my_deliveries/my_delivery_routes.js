import React from 'react';
import { Route, Switch } from "react-router-dom";
import ViewRequest from '../common/viewRequest';
import MyDeliveries from './MyDeliveries';
const MyDeliveryRoutes = () => {
    return ( 
        <Switch>
            <Route path="/my_deliveries/:requestID" component={ViewRequest} />

            <Route path="/my_deliveries" component={MyDeliveries}/>
        </Switch>
     );
}
 
export default MyDeliveryRoutes;