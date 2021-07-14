import React,{useState,useEffect} from 'react'
import styles from './currentRequest.module.css'
import Navbar from '../../global_ui/nav'
import Button from '../../global_ui/buttons/button'
import axios from "axios"
import {LoadingScreen} from "../../global_ui/spinner"
import {Dialog} from "../../global_ui/dialog/dialog"
import { useHistory } from 'react-router-dom'


function currentRequest () {
    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false); 
    const token = localStorage.getItem('token')
    const requestID=localStorage.getItem('currentRequestID');
    const history=useHistory();
  
    const [reqObj, setReqObj] = useState({
        requestNumber:"101010",
        requesterName:"Jon snow",//requesterID
        requesterPhoneNumber:"9550710377",//requesterID

        requesterCovidStatus:true,
        requestStatus:"PENDING",//need to use 
        requestType:"GENERAL",

        itemsListList:[
            {itemName:"Paracetamol",quantity:"1 Strip"},
            {itemName:"Potato",quantity:"1kg"},
            {itemName:"Noodles",quantity:"1 packet"},
            {itemName:"Dosa",quantity:"2 plates"},
        ],
        itemCategories:['GROCERIES','MISC','MEDICINES'],//need to use
        Remarks:'Vamos Barca Mes que un club',
           
        pickupLocationCoordinates:{
            type: {type: String, default: "Point"},
            coordinates: [Number]
        },    
        pickupLocationAddress:{
            addressLine: "A",
            area: "B",
            city: "C",
            pincode:"D",
        },    
        dropLocationCoordinates:{
            type: {type: String, default: "Point"},
            coordinates: [Number]
        },
        dropLocationAddress:{
            addressLine: "P",
            area: "Q",
            city: "R",
            pincode:"S",
        }
    });


    const navigateToWhatsapp=()=>{
        console.log("Whatsapp");
        //Make Calls Here        
    }

    const navigateToGoogleMaps=()=>{
        console.log("GoogleMaps");
        //Make Calls Here        
    }

    const makeDelivery=()=>{
        console.log("Make Delivery");
        //Make Calls Here        
    }

    useEffect(() => {
        setisLoading(true);       
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
      
        // eslint-disable-next-line no-undef
        axios.get(`${process.env.REACT_APP_URL}+"/"`,options)
        .then(function (response) {
            // handle success
            if(response.data.status==="success"){
            console.log(response);
            setisLoading(false)
            setReqObj({
                requestNumber:"101010",
                requesterName:"Jon snow",//requesterID
                requesterPhoneNumber:"9550710377",//requesterID

                requesterCovidStatus:true,
                requestStatus:"PENDING",//need to use 
                requestType:"GENERAL",

                itemsListList:[
                    {itemName:"Paracetamol",quantity:"1 Strip"},
                    {itemName:"Potato",quantity:"1kg"},
                    {itemName:"Noodles",quantity:"1 packet"},
                    {itemName:"Dosa",quantity:"2 plates"},
                ],
                itemCategories:['GROCERIES','MISC','MEDICINES'],//need to use
                Remarks:'Vamos Barca Mes que un club',
           
                pickupLocationCoordinates:{
                    type: {type: String, default: "Point"},
                    coordinates: [Number]
                },    
                pickupLocationAddress:{
                    addressLine: "A",
                    area: "B",
                    city: "C",
                    pincode:"D",
                },    
                dropLocationCoordinates:{
                    type: {type: String, default: "Point"},
                    coordinates: [Number]
                },
                dropLocationAddress:{
                    addressLine: "P",
                    area: "Q",
                    city: "R",
                    pincode:"S",
                }
            });
            }
            else{
                throw Error(response.data.message)
            }
            
        })
        .catch(function (error) {
            console.log(10,error);
            seterror(error);
            setisLoading(false)
        })
        .then(function () {
            // always executed
        });
        //Make a HTTP request to get current request item  
    }, [])



    return (
        requestID?(
        !isLoading?
        (
            !error?
            <div className={styles.currentRequestPage}>
                <Navbar back="true" title="Order Details" style={{background:'#79CBC5',color:'white'}}/>

                <div className={styles.currentRequestContent}>

                    <p className={styles.request}>
                    <span >RequestID 
                    <span style={{fontWeight:'lighter'}}> #{reqObj.requestNumber}</span>
                    </span>
                    <span style={{fontWeight:"bolder"}} >{reqObj.requestStatus}</span>
                    </p>

                    <p className={styles.name}>Name 

                    <span style={{fontWeight:'lighter'}}>{" "+reqObj.requesterName}</span>
                    </p>

                    <div className={styles.mobile}>
                        <i className="fas fa-phone-alt"></i>
                        {reqObj.requesterPhoneNumber}

                        <Button 
                        text="Call" 
                        isRounded="true" 
                        isElevated="true" 
                        onClick={()=>window.open(`tel:+${reqObj.mobile}`)}/>

                        <Button 
                        color="black" 
                        bgColor="white" 
                        text="Whatsapp" 
                        borderColor="black" 
                        borderWidth="1px" 
                        isRounded="true"
                        icon="fab fa-whatsapp"
                        iconPosition="left"
                        onClick={()=>navigateToWhatsapp()}
                        />
                    
                    </div>

                    {
                        reqObj.requestType==="GENERAL"&&
                        <div>
                            <div className={styles.address} style={{marginBottom:'5px'}}>
                                <p className={styles.addressPlaceHolder}>Address</p>
                                <h4 style={{fontWeight:'500',margin:'4px'}}>{reqObj.dropLocationAddress.addressLine}</h4>

                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>Area</p>
                                    <p className={styles.field}>{reqObj.dropLocationAddress.area}</p>
                                </div>

                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>City</p>
                                    <p className={styles.field}>{reqObj.dropLocationAddress.city}</p>
                                </div>
                            </div>

                            <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                            text="Open location through google maps"
                            borderWidth="1px"
                            borderColor="darkslategrey"
                            icon="fas fa-map-marker-alt"
                            iconPosition="right"
                            onClick={()=>navigateToGoogleMaps()}
                            />
                        </div>
                        
                    }

                    {
                        reqObj.requestType==="P&D"&&
                        <div>
                            <p style={{marginBottom:'13px'}}>
                                <i className="fas fa-map-marker-alt" style={{marginRight:'5px'}}></i>
                                PickUp Location
                            </p>
                            <div className={styles.address} style={{marginBottom:'5px'}}>
                                <p className={styles.addressPlaceHolder}>Address</p>
                                <h4 style={{fontWeight:'500',margin:'4px'}}>{reqObj.pickupLocationAddress.addressLine}</h4>

                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>Area</p>
                                    <p className={styles.field}>{reqObj.pickupLocationAddress.area}</p>
                                </div>

                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>City</p>
                                    <p className={styles.field}>{reqObj.pickupLocationAddress.city}</p>
                                </div>
                            </div>

                            <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                            text="Open location through google maps"
                            borderWidth="1px"
                            borderColor="darkslategrey"
                            icon="fas fa-map-marker-alt"
                            iconPosition="right"
                            onClick={()=>navigateToGoogleMaps()}
                            />


                            <p style={{marginBottom:'13px'}}>
                                <i className="fas fa-map-marker-alt" style={{marginRight:'5px'}}></i>
                                Drop Location
                            </p>
                            <div className={styles.address} style={{marginBottom:'5px'}}>
                                <p className={styles.addressPlaceHolder}>Address</p>
                                <h4 style={{fontWeight:'500',margin:'4px'}}>{reqObj.dropLocationAddress.addressLine}</h4>
 
                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>Area</p>
                                    <p className={styles.field}>{reqObj.dropLocationAddress.area}</p>
                                </div>
                                <div className={styles.inputField}>
                                    <p className={styles.fieldName}>City</p>
                                    <p className={styles.field}>{reqObj.dropLocationAddress.city}</p>
                                </div>
                            </div>

                            <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                            text="Open location through google maps"
                            borderWidth="1px"
                            borderColor="darkslategrey"
                            icon="fas fa-map-marker-alt"
                            iconPosition="right"
                            onClick={()=>navigateToGoogleMaps()}
                            />
                        </div>
                    }                    

                    <p className={styles.message}>
                    {
                        reqObj.requesterCovidStatus?
                        <p style={{color:'red',margin:'0px'}}>Requester is Covid Positive</p>:
                        <p style={{color:"darkgreen",margin:'0px'}}>Requester is Healthy</p>
                    }
                    </p>

                    <p className={styles.remark}>
                    Remarks:
                    {
                        <p className={styles.field}>{reqObj.Remarks}</p>
                    }
                    </p>

                    <div className={styles.order}>
                        <div className={styles.orderType}>
                        Requests
                        {
                            reqObj.itemCategories.includes('GROCERIES') && <Button text="Groceries" isRounded="true"  />
                        }
                        {
                            reqObj.itemCategories.includes('MEDICINES')&& <Button text="Medicines" bgColor="green" isRounded="true" />
                        }
                        {
                            reqObj.itemCategories.includes('MISC')&& <Button text="Misc" bgColor="green" isRounded="true" />
                        }                   
                        </div>
                        <div className={styles.itemsListList}>
                            <table>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                </tr>
                                {
                                    reqObj.itemsListList.map((object)=>{
                                        return <tr key={object.itemName}>                                    
                                                    <td>{object.itemName}</td>
                                                    <td>{object.quantity}</td>
                                                </tr>
                                    })
                                }
                            </table>                                       
                        </div>

                        <div style={{marginTop:'50px',textAlign:'center'}}>
                            <Button text="Make Delivery" isRounded="true" isBlock="true" isElevated="true"
                                onClick={()=>makeDelivery()}
                            />
                        </div>
                    </div>
                    
                </div>           
            </div>
            :<Dialog isShowing={error} title="Error" msg={(error.message)} onOK={()=>seterror(null)} />

          ):<LoadingScreen/>
        ):
        <div className={styles.noRequests}>

            <Navbar back="true" title="Order Details" style={{background:'#79CBC5',color:'white'}}/>
            <div style={{textAlign:'center'}}>
            <h3 style={{
                textAlign:'center',
                padding:'10px',
                color:'#757575',
                fontWeight:"lighter"
                }}
            >You have not taken up any requests currently</h3>
            
            <Button 
            bgColor="green" 
            text="Take Up Requests" 
            color="white"
            borderColor="black"
            borderWidth="1px"
            isRounded="true"
            fontSize="20px"
            
            onClick={()=>{history.push("/new_delivery")}}
            />

            </div>

            

        </div>
    )
}

export default currentRequest
