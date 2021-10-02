import React from 'react'
import {
    Switch,
    Route
  } from "react-router-dom";
import ViewRequest from '../common/viewRequest';
import ChooseRequest from './chooseRequest'

function ChooseRequestRoutes() {
    return (
        <div>
            <Switch>
            <Route exact path="/new_delivery">
                <ChooseRequest/>
            </Route>
            <Route path="/new_delivery/make">
                <ViewRequest/>
            </Route>
            
            </Switch>
            
        </div>
    )
}

export default ChooseRequestRoutes
