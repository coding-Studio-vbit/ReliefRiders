import React,{useState,useEffect} from 'react'
import styles from './viewRequest.module.css'
import Navbar from '../../global_ui/nav'
import Button from '../../global_ui/buttons/button'
import axios from "axios"
import {LoadingScreen} from "../../global_ui/spinner"
import {Dialog} from "../../global_ui/dialog/dialog"
import { useHistory, useLocation } from 'react-router-dom'


function currentRequest () {
    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false); 
    const token = localStorage.getItem('token')
    const history=useHistory();
    const location=useLocation();
    const [isDeliveryConfirmed, setisDeliveryConfirmed] = useState(false);

    const [reqObj, setReqObj] = useState({
        requestNumber:null,
        requesterName:null,//requesterID
        requesterPhoneNumber:null,//requesterID

        requesterCovidStatus:null,
        requestStatus:null,//need to use 
        requestType:null,

        itemsListList:[],
        itemCategories:[],//need to use
        Remarks:null,
   
        pickupLocationCoordinates:{
            coordinates: []
        },    
        pickupLocationAddress:{
            addressLine: null,
            area: null,
            city: null,
        },    
        dropLocationCoordinates:{
            coordinates: []
        },
        dropLocationAddress:{
            addressLine:null,
            area:null,
            city:null
        }
    });


    const navigateToWhatsapp=()=>{
        console.log("Whatsapp");
        //Make Calls Here        
    }

    const navigateToGoogleMaps=(type)=>{
        if(type==="pickUp"){
            window.open(
            `https://www.google.com/maps/search/?api=1&query=${reqObj.pickupLocationCoordinates.coordinates[0]},${reqObj.pickupLocationCoordinates.coordinates[1]}`,
            '_newtab'
            )            
        }
        else if(type==="drop"){
            window.open(
            `https://www.google.com/maps/search/?api=1&query=${reqObj.dropLocationCoordinates.coordinates[0]},${reqObj.dropLocationCoordinates.coordinates[1]}`,
            '_newtab'
            )         
        }
        console.log("GoogleMaps");
        //Make Calls Here        
    }

    const makeDelivery=()=>{
        setisLoading(true);
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }
        axios.post(`${process.env.REACT_APP_URL}/riders/makeDelivery/${location.state}`,options)
        .then((response)=>{
            if(response.data.status=="success"){
                setisLoading(false)
                setisDeliveryConfirmed(true);
            }
            else{
                setisLoading(false)
                seterror(response.data.message)                
            }
        })
        .catch(function(err){
            setisLoading(false)
            seterror(err)
            //show Dialog => Request Not Accepted            
        })

        console.log("Make Delivery");
        //Make Calls Here        
    }

    useEffect(() => {
        setisLoading(true); 
        console.log(10,location.state);      
        const options = {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }      
        // eslint-disable-next-line no-undef
        axios.get(`${process.env.REACT_APP_URL}/rider/requestDetails/${location.state}`,options)
        .then(function (response) {
            // handle success
            if(response.data.status==="success"){
            console.log(response);
            setisLoading(false)
            setReqObj({
                requestNumber:response.data.message.requestNumber,
                requesterName:response.data.message.requesterName,
                requesterPhoneNumber:response.data.message.requesterPhoneNumber,

                requesterCovidStatus:response.data.message.requesterCovidStatus,
                requestStatus:response.data.message.requestStatus,
                requestType:response.data.message.requestType,

                itemsListList:response.data.message.itemsListList,
                itemCategories:response.data.message.itemCategories,
                Remarks:response.data.message.remark,
           
                pickupLocationCoordinates:{
                    coordinates:response.data.message.pickupLocationCoordinates.coordinates
                },    
                pickupLocationAddress:{
                    addressLine:response.data.message.pickupLocationAddress.addressLine,
                    area:response.data.message.pickupLocationAddress.area,
                    city: response.data.message.pickupLocationAddress.city
                },    
                dropLocationCoordinates:{
                    coordinates: response.data.message.dropLocationCoordinates.coordinates
                },
                dropLocationAddress:{
                    addressLine:response.data.message.dropLocationAddress.addressLine,
                    area:response.data.message.dropLocationAddress.area,
                    city:response.data.message.dropLocationAddress.city
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
        location.state?(
        !isLoading?
        (
            !error?
            <div className={styles.currentRequestPage}>
                <Navbar back="true" title="Order Details" style={{background:'#79CBC5',color:'white'}}/>

                <Dialog 
                isShowing={isDeliveryConfirmed} 
                title="Delivery Confirmed" 
                msg={`Delivery Taken Up with requestID ${location.state}`} 
                onOK={()=>{
                    setisDeliveryConfirmed(false)
                    history.push("/current_request");
                }}
                />

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

                    {/* GENERAL REQUEST */}
                    {
                        reqObj.requestType==="GENERAL"&&
                        <div>
                            {
                                (
                                    reqObj.dropLocationAddress.addressLine &&
                                    reqObj.dropLocationAddress.city &&
                                    reqObj.dropLocationAddress.area
                                )
                                &&
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
                            }                           
                            {
                                reqObj.dropLocationCoordinates.coordinates.length!=0 &&
                                <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                                text="Open location through google maps"
                                borderWidth="1px"
                                borderColor="darkslategrey"
                                icon="fas fa-map-marker-alt"
                                iconPosition="right"
                                onClick={()=>navigateToGoogleMaps("drop")}
                                />
                            }                            
                        </div>
                    }

                    {/* P&D REQUEST */}
                    {
                        reqObj.requestType==="P&D"&&
                        <div>
                            {/* {PICK UP LOCATION} */}
                            <p style={{marginBottom:'13px'}}>
                                <i className="fas fa-map-marker-alt" style={{marginRight:'5px'}}></i>
                                PickUp Location
                            </p>
                            {
                                (
                                    reqObj.pickupLocationAddress.addressLine &&
                                    reqObj.pickupLocationAddress.city &&
                                    reqObj.pickupLocationAddress.area
                                )&&                                
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
                                                               
                            }
                            {
                                reqObj.pickupLocationCoordinates.coordinates.length!=0
                                &&
                                <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                                text="Open location through google maps"
                                borderWidth="1px"
                                borderColor="darkslategrey"
                                icon="fas fa-map-marker-alt"
                                iconPosition="right"
                                onClick={()=>navigateToGoogleMaps("pickUp")}
                                />
                            }  

                            {/* DROP LOCATION */}
                            <p style={{marginBottom:'13px'}}>
                                <i className="fas fa-map-marker-alt" style={{marginRight:'5px'}}></i>
                                Drop Location
                            </p>
                            {

                                (
                                    reqObj.dropLocationAddress.addressLine &&
                                    reqObj.dropLocationAddress.city &&
                                    reqObj.dropLocationAddress.area
                                )&&                               
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
                            } 
                            {
                                reqObj.dropLocationCoordinates.coordinates.length!=0
                                &&
                                <Button color="brown" bgColor="white" isBlock="true" isRounded="true"
                                text="Open location through google maps"
                                borderWidth="1px"
                                borderColor="darkslategrey"
                                icon="fas fa-map-marker-alt"
                                iconPosition="right"
                                onClick={()=>navigateToGoogleMaps("drop")}
                                />
                            }                    
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

                        {
                            reqObj.requestStatus==="PENDING" &&
                            <div style={{marginTop:'50px',textAlign:'center'}}>
                            <Button text="Make Delivery" isRounded="true" isBlock="true" isElevated="true"
                                onClick={()=>makeDelivery()}
                                />
                            </div>
                        }

                        
                    </div>
                    
                </div>           
            </div>
            :<Dialog isShowing={error} title="Error" msg={(error.message)} 
            onOK={()=>{
                seterror(null)
                history.goBack();
                }
            } />

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
            >Invalid RequestID</h3>
            
            
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
