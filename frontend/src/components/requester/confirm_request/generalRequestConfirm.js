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
  const [paymentPrefer, setPaymentPrefer] = useSessionStorageState("payement","");
  const [noContactDeliver, setNoContactDeliver] = useSessionStorageState("nocontact",false);
  const [deliveryRemarks, setDeliverRemarks] = useSessionStorageState("remarks","");
  const [covidStatus, setCovidStatus] = useSessionStorageState("covidStatus",false);
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { state } = useContext(NewRequestContext);
  const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);
  const routeRedirect = useRef('/my_requests')
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
        back={"address"}
        onBackClick={()=>{
          if(state.dropLocationCoordinates.length !== 0){
            history.replace('map_location/false')
          }else{
            history.replace('address')
          }
          
        }}
        title="Place Request"
      />
      <ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        setDialogData={setDialogData}
        routeRedirect={routeRedirect.current}
        onOK={async () => {
          if (cancel) {
            localStorage.removeItem('draft')
            localStorage.removeItem('new_request')
            sessionStorage.clear()
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
            formData.append('paymentPreference',paymentPrefer)
            console.log(state.dropLocation);
            const res = await placeRequest(formData, token,state.requestType);
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
        <p className={ConfirmReqCSS.paymentLabel}>Select Payment Preference:</p>
        <div onChange={(e) => setPaymentPrefer(e.target.value)}>
          <input
            className={ConfirmReqCSS.radioBtn}
            type="radio"
            name="payment"
            value="Cash"
          />
          <label className={ConfirmReqCSS.radioLabel}>Cash</label>
          <input
            className={ConfirmReqCSS.radioBtn}
            type="radio"
            name="payment"
            value="Paytm"
          />
          <label className={ConfirmReqCSS.radioLabel}>Paytm</label>
          <input
            className={ConfirmReqCSS.radioBtn}
            type="radio"
            name="payment"
            value="Gpay"
          />
          <label className={ConfirmReqCSS.radioLabel}>G-Pay</label>
          <input
            className={ConfirmReqCSS.radioBtn}
            type="radio"
            name="payment"
            value="PhonePay"
          />
          <label className={ConfirmReqCSS.radioLabel}>PhonePay</label>
        </div>
      </div>
      <div className={ConfirmReqCSS.generalRequestDiv}>
        <div className={ConfirmReqCSS.noContactDelDiv}>
          <label>NO CONTACT DELIVERY</label>
          <input
            className={ConfirmReqCSS.noContactDelCheckbox}
            type="checkbox"
            onChange={() => setNoContactDeliver(!noContactDeliver)}
          />
          <br />
        </div>
        <div style={{padding:'0.8em'}}>
          <label className={ConfirmReqCSS.delRemarksDiv}>
            Delivery Remarks:
          </label>
          <br />
          <textarea
            type="text"
            rows='6'
            className={ConfirmReqCSS.delRemarksText}
            onChange={(e) => setDeliverRemarks(e.target.value)}
          />
          <br />
        </div>
        <div className={ConfirmReqCSS.covidStat}>
          <span>Are you COVID positive?</span>
          <br />
          <input
            type="checkbox"
            className={ConfirmReqCSS.covidStatCheckbox}
            onChange={() => setCovidStatus(!covidStatus)}
          ></input>
          <br />
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
