import ConfirmReqCSS from './confirmRequest.module.css';
import React, { useState } from 'react';
import Navbar from '../../global_ui/nav';
import {useHistory} from "react-router-dom";


const ConfirmRequestPD = () =>{
    const [noContactDeliver,setNoContactDeliver] = useState(false);
    const [deliveryRemarks,setDeliverRemarks] = useState('');
    const [covidStatus,setCovidStatus] = useState(false);
    const history =useHistory();
    const routehandler = (route) => {
		history.push(route);
	};
    console.log(deliveryRemarks)
    return (
        <div className = {ConfirmReqCSS.confirmRequestDiv}>
            <Navbar back={'address'} backStyle={{ color: 'white' }} title="New Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "25px" }} />
                <div className = {ConfirmReqCSS.generalRequestDiv}>
                <div className = {ConfirmReqCSS.generalRequestDiv}>
                    <div  className ={ConfirmReqCSS.noContactDelDiv}>
                        <label className = {ConfirmReqCSS.noContactTxt}>NO CONTACT DELIVERY</label>
                        <input  className ={ConfirmReqCSS.noContactDelCheckbox} type = "checkbox"
                        onChange = {()=>setNoContactDeliver(!noContactDeliver)}  /><br/>
                    </div>
                <div className = {ConfirmReqCSS.delRemarksDiv} >
                    <label className = {ConfirmReqCSS.delTxt}>Delivery Remarks:</label>
                    {/* <textarea type = "text" className = {ConfirmReqCSS.delRemarksText}
                    onChange = {(e)=>setDeliverRemarks(e.target.value)} /><br /> */}
                    <textArea   placeholder = {'Please enter your instructions here'} 
                    name = "deliveryRemarks" rows = {'7'} cols = {'50'} width = {'367px'} 
                    onChange = {(e)=>setDeliverRemarks(e.target.value)}    />
                </div>
                <div className = {ConfirmReqCSS.covidStat}>
                    <span>Are you COVID positive?</span>
                </div>
                <div className = {ConfirmReqCSS.covidStatCheck}>
                    <input type = 'checkbox' className = {ConfirmReqCSS.covidStatCheckbox}
                    onChange = {()=>setCovidStatus(!covidStatus)}></input><br />
                    </div>
                
                <div className = {ConfirmReqCSS.btns}>
                    <button className = {ConfirmReqCSS.cancelRequestBtn} >Cancel Request
                    <i className="fas fa-times" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                    <button className = {ConfirmReqCSS.confirmRequestBtn} onClick={() => routehandler("/my_requests")}>Confirm Request
                    <i className="fas fa-arrow-right" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                </div>
            </div>

            </div></div>
    )

}

export default ConfirmRequestPD;