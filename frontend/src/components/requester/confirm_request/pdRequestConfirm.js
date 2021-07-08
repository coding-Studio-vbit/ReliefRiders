import ConfirmReqCSS from './confirmRequest.module.css';
import React, { useState } from 'react';
import Navbar from '../../global_ui/nav';
import {useHistory} from "react-router-dom";
import { ConfirmDialog } from '../../global_ui/dialog/dialog';
import { placeRequest } from '../../context/new_request/place_request';
import { useContext } from 'react/cjs/react.development';
import { NewRequestContext } from '../../context/new_request/newRequestProvider';
import { AuthContext } from '../../context/auth/authProvider';

const ConfirmRequestPD = () =>{
    const [noContactDeliver,setNoContactDeliver] = useState(false);
    const [deliveryRemarks,setDeliverRemarks] = useState('');
    const [covidStatus,setCovidStatus] = useState(false);
    const history =useHistory();
    const _handleConfirm = () => {
		setDialogData({
            show: true,
            msg: "Are you sure you want to place a new request ?",
          });
	};
    const {token} = useContext(AuthContext)
    const {state} = useContext(NewRequestContext)
    const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);
    console.log(deliveryRemarks)
    return (
        <div className = {ConfirmReqCSS.confirmRequestDiv}>

<ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        setDialogData={setDialogData}
        routeRedirect='/my_requests'
        onOK={async () => {
          if (cancel) {
            history.push("/");
            window.location.reload();
          } else {
            const formData = new FormData();
            formData.append("requesterCovidStatus", covidStatus);
            formData.append("noContactDelivery", noContactDeliver);
            formData.append("itemsListList", JSON.stringify(state.itemsList));
            formData.append("itemCategories", state.categories);
            formData.append("remarks", deliveryRemarks);
            formData.append(
              "dropLocationCoordinates",
              JSON.stringify(state.dropLocationCoordinates)
            );
            formData.append(
              "dropLocationAddress",
              JSON.stringify(state.dropLocation)
            );
            formData.append(
                "pickupLocationAddress",
                JSON.stringify(state.pickupLocation)
              );
              formData.append(
                "pickupLocationCoordinates",
                JSON.stringify(state.pickupLocationCoordinates)
              );
            
            const res = await placeRequest(formData, token,state.requestType);
            if (res === 1) {
              setDialogData({
                ...dialogData,
                msg: "Request placed successfully",
              });
            } else {
              setDialogData({ ...dialogData, msg: res });
            }
          }
        }}
      />

            <Navbar back={'address'} backStyle={{ color: 'white' }} title="New Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "25px" }} />
                <div className = {ConfirmReqCSS.generalRequestDiv}>
                    <div  className ={ConfirmReqCSS.noContactDelDiv}>
                        <label>NO CONTACT DELIVERY</label>
                        <input  className ={ConfirmReqCSS.noContactDelCheckbox} type = "checkbox"
                        onChange = {()=>setNoContactDeliver(!noContactDeliver)}  /><br/>
                    </div>
                <div >
                    <label className = {ConfirmReqCSS.delRemarksDiv}>Delivery Remarks:</label><br />
                    <textarea type = "text" className = {ConfirmReqCSS.delRemarksText}
                    onChange = {(e)=>setDeliverRemarks(e.target.value)} /><br />
                </div>
                <div className = {ConfirmReqCSS.covidStat}>
                    <span>Are you COVID positive?</span><br />
                    <input type = 'checkbox' className = {ConfirmReqCSS.covidStatCheckbox}
                    onChange = {()=>setCovidStatus(!covidStatus)} /><br />
                    <button onClick={()=>{
                        setCancel(true);
                        setDialogData({
                          show: true,
                          msg: "Are you sure you want to cancel placing a new request ?",
                        });
                    }} className = {ConfirmReqCSS.cancelRequestBtn} >Cancel Request
                    <i className="fas fa-times" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                    <button className = {ConfirmReqCSS.confirmRequestBtn} onClick={_handleConfirm}>Confirm Request
                    <i className="fas fa-arrow-right" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                </div>
            </div>

        </div>
    )

}

export default ConfirmRequestPD;