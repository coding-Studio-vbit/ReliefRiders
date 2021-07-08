import React from "react";
import { Switch,Route } from "react-router";
import ListType from "./ItemListType";

import UploadImages from '../../requester/new_request/upload_images';
import EnterItemsForm from '../new_request/enter_items_form/enterItemsForm'
import ChooseAddress from '../../requester/new_request/PinAddress';
import ConfirmRequestGeneral from '../../requester/confirm_request/generalRequestConfirm';
import ConfirmRequestPD from '../../requester/confirm_request/pdRequestConfirm';
import Map from '../../requester/new_request/maps/map';
import RequestType from '../../requester/new_request/NewRequestType';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NewRequestRoutes = () => {
    const history = useHistory()
    useEffect(()=>{
        const draft = localStorage.getItem('draft')
      
        if(draft){
            history.push(draft)
        }else{
            history.replace('/new_request')
        }
    },[])
    return (
         
        <Switch>
            
            <Route path="/new_request/list_type" >
                <ListType/>
            </Route>
            <Route path="/new_request/map_location" >
                <Map />
            </Route>
            <Route path="/new_request/add_image" >
                < UploadImages/>
            </Route>
            <Route path="/new_request/enter_items" >
                <EnterItemsForm/>
            </Route>
            <Route path="/new_request/address" >
                < ChooseAddress/>
            </Route>
            <Route path="/new_request/confirm_general" >
                < ConfirmRequestGeneral/>
            </Route>
            <Route path="/new_request/confirm_pd" >
                < ConfirmRequestPD/>
            </Route>
            <Route path='/new_request'>
            <RequestType />
            </Route>
        </Switch>

     );
}
 
export default NewRequestRoutes;