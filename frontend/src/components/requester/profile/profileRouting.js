import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RequesterProfile from './RequesterProfile'
import EditRequesterProfile from './editRequesterProfile'

function ProfileRouting() {
    return (
        <Switch>            
            <Route path="/my_profile/edit_profile" >
                <EditRequesterProfile/>                
            </Route> 

            <Route path="/">
                <RequesterProfile/>
            </Route>               
        </Switch>
    )
}

export default ProfileRouting
