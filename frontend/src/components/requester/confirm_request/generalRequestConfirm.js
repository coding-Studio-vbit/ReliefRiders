import ConfirmReqCSS from './confirmRequest.module.css';
import React, { useState } from 'react';
import Navbar from '../../global_ui/nav';
import {useHistory} from "react-router-dom";
const ConfirmRequestGeneral = () => {
    const [paymentPrefer, setPaymentPrefer] = useState([]);
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
            <Navbar back={'address'} backStyle={{ color: 'white' }} title="New Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "25px" }} />
            <div>
                <p className = {ConfirmReqCSS.paymentLabel}>Select Payment Preference:</p> 
                {/* <div className = {ConfirmReqCSS.paymentDiv} onChange = {(e)=>{
                    if (e.target.checked){
                        setPaymentPrefer(paymentPrefer => [...paymentPrefer,e.target.value])
                    }
                    else{
                        setPaymentPrefer(paymentPrefer.filter(item => item!== e.target.value))
                    }
                }}>
                    <input className = {ConfirmReqCSS.paymentCheckbox} type="checkbox" name="payment" value="CASH" />
                    <label  className = {ConfirmReqCSS.checkboxLabel}>Cash</label>
                    <input  className = {ConfirmReqCSS.paymentCheckbox} type="checkbox" name="payment" value="PAYTM"/>
                    <label  className = {ConfirmReqCSS.checkboxLabel}>Paytm</label>
                    <input className = {ConfirmReqCSS.paymentCheckbox} type="checkbox" name="payment" value="GPAY"/>
                    <label className = {ConfirmReqCSS.checkboxLabel}>G-Pay</label>
                </div> */}
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
                    <button className = {ConfirmReqCSS.confirmRequestBtn} onClick={() => routehandler("/my_requests")}>Confirm Request
                    <i className="fas fa-arrow-right" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                </div>
            </div>

        </div>

    )
}


export default ConfirmRequestGeneral;