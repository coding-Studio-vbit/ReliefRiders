import React from 'react'
import styles from './requesttype.module.css'
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import CreateRequestGeneral from '../GeneralRequest/createRequestGeneral';
import PndRequest from '../P&DRequest/pndrequest';

function NewRequest() { 
    return (
        <Router>
            <Switch>
                <Route exact path="/createrequest">
                    <RequestType/>
                </Route>
                <Route path="/createrequest/general">
                    <CreateRequestGeneral/>
                </Route>
                <Route path="/createrequest/p&d">
                    <PndRequest/>
                </Route>
            </Switch>        
        </Router>         
    )
}

export default NewRequest;

function RequestType() {
    let history=useHistory();

    function route(p) {
        //p=true routes to general request page
        //p=false routes to p&d request page
        if(p){
            history.push('/createrequest/general');
        }
        else{
            history.push('/createrequest/p&d')
        }
    }
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <p className={styles.name} onClick={()=>route(true)}>General Request</p>
            </div>
            <div className={styles.card}>
                <p className={styles.name} onClick={()=>route(false)}>P&D Request</p>
            </div>                 
        </div>
    )
}


