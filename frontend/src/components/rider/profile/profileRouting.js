import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RiderProfile from './RiderProfile'
import EditRiderProfile from './editRiderProfile'

function profileRouting() {
    return (
        <Switch>           
            <Route path="/my_profile/edit_profile" >
                <EditRiderProfile/>                
            </Route>       
            <Route path="/">
                <RiderProfile/>
            </Route>         
        </Switch>
        
    )
}

export default profileRouting
