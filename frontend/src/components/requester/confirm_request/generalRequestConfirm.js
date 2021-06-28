import ConfirmReqCSS from './confirmRequest.module.css';
import React, { useState } from 'react';
import Navbar from '../../global_ui/nav';
import {useHistory} from "react-router-dom";
const ConfirmRequestGeneral = () => {
    const [paymentPrefer, setPaymentPrefer] = useState('');
    const [noContactDeliver,setNoContactDeliver] = useState(false);
    const [deliveryRemarks,setDeliverRemarks] = useState('');
    const [covidStatus,setCovidStatus] = useState(false);
    const history =useHistory();
    const routehandler = (route) => {
		history.push(route);
	};
    console.log(paymentPrefer);
    console.log(deliveryRemarks)
    return (
        <div className = {ConfirmReqCSS.confirmRequestDiv}>
            <Navbar back={'/address'} backStyle={{ color: 'white' }} title="New Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "25px" }} />
            <div>
                <p className = {ConfirmReqCSS.paymentLabel}>Select Payment Preference:</p> 
                <div 
                onChange = {(e)=>setPaymentPrefer(e.target.value)} >
                    <input className = {ConfirmReqCSS.radioBtn} type="radio" name="payment" value="Cash" />
                    <label  className = {ConfirmReqCSS.radioLabel}>Cash</label>
                    <input  className = {ConfirmReqCSS.radioBtn} type="radio" name="payment" value="Paytm" />
                    <label  className = {ConfirmReqCSS.radioLabel}>Paytm</label>
                    <input className = {ConfirmReqCSS.radioBtn} type="radio" name="payment" value="Gpay" />
                    <label className = {ConfirmReqCSS.radioLabel}>G-Pay</label>
                    <input className = {ConfirmReqCSS.radioBtn} type="radio" name="payment" value="Card" />
                    <label className = {ConfirmReqCSS.radioLabel}>Card</label>
                </div>
            </div>
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
                    onChange = {()=>setCovidStatus(!covidStatus)}></input><br />
                    <button className = {ConfirmReqCSS.cancelRequestBtn} >Cancel Request
                    <i className="fas fa-times" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                    <button className = {ConfirmReqCSS.confirmRequestBtn} onClick={() => routehandler("/requester")}>Confirm Request
                    <i className="fas fa-arrow-right" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                </div>
            </div>

        </div>

    )
}


export default ConfirmRequestGeneral;