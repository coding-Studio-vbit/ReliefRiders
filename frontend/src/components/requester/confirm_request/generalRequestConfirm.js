/* eslint-disable no-unused-vars */
import ConfirmReqCSS from './confirmRequest.module.css';
import React, { useState } from 'react';
import Navbar from '../../global_ui/nav';
import {useHistory} from "react-router-dom";
import { ConfirmDialog } from "../../global_ui/dialog/dialog";
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../../context/auth/authProvider';
import { NewRequestContext } from '../../context/new_request/newRequestProvider';

const ConfirmRequestGeneral = () => {
    const [paymentPrefer, setPaymentPrefer] = useState('');
    const [noContactDeliver,setNoContactDeliver] = useState(false);
    const [deliveryRemarks,setDeliverRemarks] = useState('');
    const [covidStatus,setCovidStatus] = useState(false);
    const history =useHistory();
    const {token } = useContext(AuthContext)
    const {state} = useContext(NewRequestContext)
  const [dialogData, setDialogData] = useState({ show: false, msg: "" });
  const [cancel, setCancel] = useState(false);

    console.log(paymentPrefer);
    console.log(deliveryRemarks)
    const _handleConfirm = ()=>{
        setDialogData({show:true,msg:'Are you sure you want to place a new request ?'})
    }
    const _handleCancel = ()=>{
        setCancel(true)
        setDialogData({show:true,msg:'Are you sure you want to cancel placing a new request ?'})
    }
    return (
        <div className = {ConfirmReqCSS.confirmRequestDiv}>
            <Navbar back={'address'} backStyle={{ color: 'white' }} title="New Requests" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "25px" }} />
            <ConfirmDialog
        isShowing={dialogData.show}
        msg={dialogData.msg}
        setDialogData={setDialogData}
        routeRedirect="my_requests"
        onOK={async () => {
            if(cancel){
                history.push('/')
                window.location.reload()
            }else{
                const d = sessionStorage.getItem('uploaded_images')
                const imgs = JSON.parse(d)
                let promises = []
                for(const src in imgs){
                    promises.push(fetch(src).then(r=>r.blob()))
                }
                const blobs = await Promise.all(promises)

                 const formData = new FormData()
                 formData.append('images', blobs)
                 formData.append("requesterCovidStatus",covidStatus)
                 formData.append("noContactDelivery",noContactDeliver)
                 formData.append("itemsListList",JSON.stringify(state.itemsList))
                 formData.append("itemCategories",state.categories)
                 formData.append("Remarks", deliveryRemarks)
                 formData.append("dropLocationCoordinates",JSON.stringify(state.dropLocationCoordinates))
                 formData.append("dropLocationAddress",JSON.stringify( {addressLine:"egfdetfd",city:"jhegd",pincode:"500047"}))
                // eslint-disable-next-line no-undef
                const res = await fetch(process.env.REACT_APP_URL+'/requests/newRequest/general',{
                   method:'POST',
                    headers: {
                        authorization: "Bearer " + token,
                      },
                    body:formData
                })
                console.log(res);
                setDialogData({ ...dialogData, msg: "Confirmed successfully" });
                


             //   history.push('/my_requests')
             //   window.location.reload()

            }
         
        }}
      />
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
                    <input className = {ConfirmReqCSS.radioBtn} type="radio" name="payment" value="PhonePay" />
                    <label className = {ConfirmReqCSS.radioLabel}>PhonePay</label>
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
                    <button onClick={_handleCancel} className = {ConfirmReqCSS.cancelRequestBtn} >Cancel Request
                    <i className="fas fa-times" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                    <button className = {ConfirmReqCSS.confirmRequestBtn} onClick={_handleConfirm}>Place Request
                    <i className="fas fa-arrow-right" style = {{"marginLeft" : "1em"}}></i>
                    </button>
                </div>
            </div>

        </div>

    )
}


export default ConfirmRequestGeneral;