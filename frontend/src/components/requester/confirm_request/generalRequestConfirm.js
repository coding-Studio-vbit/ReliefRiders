import ConfirmReqCSS from "./confirmRequest.module.css";
import React, { useState } from "react";
import Navbar from "../../global_ui/nav";
import { ConfirmDialog } from "../../global_ui/dialog/dialog";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth/authProvider";
import { NewRequestContext } from "../../context/new_request/newRequestProvider";
import { placeRequest } from "../../context/new_request/place_request";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useSessionStorageState } from "../../../utils/useLocalStorageState";

const ConfirmRequestGeneral = () => {
  const [paymentPrefer, setPaymentPrefer] = useState([]);
  const [deliveryRemarks, setDeliveryRemarks] = useSessionStorageState('remarks', '');
  const [noContactDeliver, setNoContactDeliver] = useSessionStorageState("nocontact", false);
  const [covidStatus, setCovidStatus] = useSessionStorageState("covidStatus", false);
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { state } = useContext(NewRequestContext);
  const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);
  const routeRedirect = useRef('/my_requests')
  // console.log(paymentPrefer)
  const _handleConfirm = () => {
    setDialogData({
      show: true,
      msg: "Are you sure you want to place a new request ?",
    });
  };
  const _handleCancel = () => {
    setCancel(true);
    setDialogData({
      show: true,
      msg: "Are you sure you want to cancel placing a new request ?",
    });
  };

  
  return (
    <div className={ConfirmReqCSS.confirmRequestDiv}>
      <Navbar
        back={"address_drop"}
        title="Place Request"
      />
      <ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        onCancel={()=>setCancel(false)}
        setDialogData={setDialogData}
        routeRedirect={routeRedirect.current}
        onOK={async () => {
          if (cancel) {
            localStorage.setItem('draft','/new_request')
            localStorage.removeItem('new_request')
            sessionStorage.clear()
            history.replace("/");
            
          } else {
            const formData = new FormData();
            formData.append("requesterCovidStatus", covidStatus);
            formData.append("noContactDelivery", noContactDeliver);
            formData.append("itemsListList", JSON.stringify(state.itemsList));
            formData.append("itemCategories", JSON.stringify(state.categories));
            formData.append("remarks", deliveryRemarks);
            formData.append(
              "dropLocationCoordinates",
              JSON.stringify(state.dropLocationCoordinates)
            );
            formData.append(
              "dropLocationAddress",
              JSON.stringify(state.dropLocation)
            );
            formData.append('paymentPreference', paymentPrefer)
            console.log(state.dropLocation);
            const res = await placeRequest(formData, token, state.requestType);
            if (res === 1) {
              setDialogData({
                ...dialogData,
                msg: "Request placed successfully",
              });
            } else {
              routeRedirect.current = null

              setDialogData({ ...dialogData, msg: res });
            }
          }
        }}
      />
      <div>
             <p className = {ConfirmReqCSS.paymentLabel}>Select Payment Preference:</p> 
            <div className = {ConfirmReqCSS.up_list} 
            onChange = {(e)=>{
                if (e.target.checked){
                    setPaymentPrefer(paymentPrefer => [...paymentPrefer,e.target.value])
                }
                else{
                    setPaymentPrefer(paymentPrefer.filter(item => item!== e.target.value))
                }
            }}>
                <div>
                    <label className={ConfirmReqCSS.up_check_label}>Cash
                    <input type="checkbox" value = "CASH" />
                    <span className={`${ConfirmReqCSS.up_check} ${ConfirmReqCSS.check_1}`}></span>
                    </label>
                </div>
                <div>
                    <label className={ConfirmReqCSS.up_check_label}>Paytm
                    <input type="checkbox" value = "PAYTM" />
                    <span className={`${ConfirmReqCSS.up_check} ${ConfirmReqCSS.check_1}`}></span>
                    </label>
                </div>
                <div>
                    <label className={ConfirmReqCSS.up_check_label}>G-pay
                    <input type="checkbox" value = "GPAY" />
                    <span className={`${ConfirmReqCSS.up_check} ${ConfirmReqCSS.check_1}`}></span>
                    </label>
                </div>
            
            
            </div>    
            </div>
                <div className = {ConfirmReqCSS.generalRequestDiv}>
                    <div  className ={ConfirmReqCSS.noContactDelDiv}>
                        <label className = {ConfirmReqCSS.noContactTxt}>NO CONTACT DELIVERY</label>
                        <input  className ={ConfirmReqCSS.noContactDelCheckbox} type = "checkbox"
                        onChange = {()=>setNoContactDeliver(!noContactDeliver)}  /><br/>
                    </div>
                <div className = {ConfirmReqCSS.delRemarksDiv} >
                    <label className = {ConfirmReqCSS.delTxt}>Delivery Remarks:</label>
                    {/* <textarea type = "text" className = {ConfirmReqCSS.delRemarksText}
                    onChange = {(e)=>setDeliveryRemarks(e.target.value)} /><br /> */}
                    <textArea   placeholder = {'Please enter your instructions here'} 
                    name = "deliveryRemarks" rows = {'7'} cols = {'50'} width = {'367px'} 
                    onChange = {(e)=>setDeliveryRemarks(e.target.value)}    />
                </div>
                <div className = {ConfirmReqCSS.covidStat}>
                    <span>Are you COVID positive?</span>
                </div>
                <div className = {ConfirmReqCSS.covidStatCheck}>
                    <input type = 'checkbox' className = {ConfirmReqCSS.covidStatCheckbox}
                    onChange = {()=>setCovidStatus(!covidStatus)}></input><br />
                    </div>
          
          <div className = {ConfirmReqCSS.btns}>
          <button
            onClick={_handleCancel}
            className={ConfirmReqCSS.cancelRequestBtn}
          >
            Cancel Request
            <i className="fas fa-times" style={{ marginLeft: "1em" }}></i>
          </button>
          <button
            className={ConfirmReqCSS.confirmRequestBtn}
            onClick={_handleConfirm}
          >
            Place Request
            <i className="fas fa-arrow-right" style={{ marginLeft: "1em" }}></i>
          </button>
          </div>
        </div>
      </div>
  );
};

export default ConfirmRequestGeneral;
