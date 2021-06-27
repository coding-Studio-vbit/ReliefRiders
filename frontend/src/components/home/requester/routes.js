import React from 'react';
import { Route, Switch } from 'react-router';
import RequesterHomeScreen from './RequesterHomeScreen';
import { BrowserRouter } from 'react-router-dom';
import MyRequestsRoutes from '../../requester/my_requests/my_requests_routes';
import RequestType from '../../requester/new_request/NewRequestType';
import ListType from '../../requester/new_request/ItemListType';
import EnterItemsForm from '../../requester/new_request/enter_items_form/enterItemsForm';
import Map from '../../requester/new_request/maps/map';
import ChooseAddress from '../../requester/new_request/PinAddress';
import UploadImages from '../../requester/new_request/upload_images';
import ConfirmRequestGeneral from '../../requester/confirm_request/generalRequestConfirm';
import ConfirmRequestPD from '../../requester/confirm_request/pdRequestConfirm';

const RequesterHomeRoutes = () => {
    return (
        <BrowserRouter basename="/home/requester" >
        <Switch>
            
            
            <Route path="/my_requests" >
                <MyRequestsRoutes />
            </Route>
            <Route path="/my_profile" >
                MyProfileHere
            </Route>
            <Route path="/map_location" >
                <Map />
            </Route>
            <Route path="/address" >
                < ChooseAddress/>
            </Route>
            <Route path="/add_image" >
                < UploadImages/>
            </Route>
            <Route path="/confirm_general" >
                < ConfirmRequestGeneral/>
            </Route>
            <Route path="/confirm_pd" >
                < ConfirmRequestPD/>
            </Route>
            
            <Route path="/new_request" >
                <RequestType />
            </Route>
            <Route path="/list_type" >
                <ListType />
            </Route>
            <Route path="/enter_items" >
                <EnterItemsForm />
            </Route>
            <Route path="/">
                <RequesterHomeScreen />
            </Route>
        </Switch>
        </BrowserRouter>
    );
}

export default RequesterHomeRoutes;
