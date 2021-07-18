import React from 'react';
import { Route, Switch } from "react-router-dom";
import MyDeliveries from './MyDeliveries';
const MyDeliveryRoutes = () => {
    return ( 
        <Switch>
            <Route path="/my_deliveries/:requestID"/>

            <Route path="/my_deliveries" component={MyDeliveries}/>
        </Switch>
     );
}
 
export default MyDeliveryRoutes;