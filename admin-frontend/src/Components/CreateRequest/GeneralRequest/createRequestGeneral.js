import GS from "./createRequestGeneral.module.css";
import { Button } from 'react-bootstrap';
import React from "react";
import { useState } from "react";

export default function CreateRequestGeneral() {
     const [name, setName]= useState("");
     const [phone, setPhone]= useState("");
     const [address, setAddress]= useState("");
     const [city, setCity]= useState("");
     const [area, setArea]= useState("");
     const [itemName, setItemName]= useState("");
     const [itemQty, setItemQty]= useState("");
     const [inputList, setInputList] = useState([]);
     const [payment, setPayment]= useState(""); 
     const [startDate, setstartDate] = useState();
     const [contact, setContact]= useState();
     const [covidStatus, setCovidStatus]= useState();    
     
     function handleCancel() {
      //http request for cancelling the form   
    }

    function handleSubmit() {
      if(name==="" || phone==="" || address==="" || city==="" || area==="" || startDate==="" || !inputList ){
        alert("Fill Details Properly")

      }  
    }
     const handleAddClick = (e) => {
      e.preventDefault();
  
      if (itemQty !== "" && itemName !== "") {
        let updatelist = [
          ...inputList,
          {
            itemName: itemName,
            quantity: itemQty,
          },
        ];
  
        setInputList(updatelist);
        setItemName("");
        setItemQty("");
      }
        console.log(inputList);
      };

    const onEdititem = (index) => {
      setItemName(inputList[index].itemName);
      setItemQty(inputList[index].quantity);
  
      const list = [...inputList];
      list.splice(index, 1);
      setInputList([...list]);
    };

    const onDelete = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList([...list]);
    }; 

       return(
        <div style={{marginLeft:'3%',marginRight:'3%',marginTop:'3%'}} className={GS.page}>
          <div className={GS.rootContainer}>
            <h5 className={GS.header}>Requester Details</h5>
            <form> 
              <div className={GS.formField}>
              <label className={GS.label1}>Full Name</label>                   
              <input className={GS.inputdata} type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}></input>
              </div>                            

              <div className={GS.formField}>
              <label className={GS.label1}>Date of Birth</label>                    
              <input className={GS.inputdata} type="date" id="DateOfBirth" placeholder="DoB" value={startDate} 
              onChange={(event) => setstartDate(event.target.value)}>
              </input> 
              </div>
                                 
              <div className={GS.formField}>
                <label className={GS.label1}>Phone Number</label>            
                <input type="tel" className={GS.inputdata} placeholder="Phone Number" value={phone} onChange={(e)=> setPhone(e.target.value)}>
                </input>
              </div>                         
              
              <div className={GS.formField}>
                <label className={GS.label1}>Location</label>
                <div className={GS.c2}>                
                <textarea className={GS.address} rows="3" placeholder="Address" value={address} onChange={(e)=> setAddress(e.target.value)}></textarea>
                <input type="text" className={GS.address} placeholder="City" style={{marginTop:"1%"}} value={city} onChange={(e)=> setCity(e.target.value)}></input>
                <input type="text" className={GS.address} placeholder="Area" style={{marginTop:"1%"}} value={area} onChange={(e)=> setArea(e.target.value)}></input>
                </div> 
              </div>
            </form>
          </div>

          <div className={GS.rootContainer}>
            <h5 className={GS.header}>Order Details</h5>
            <form>
              <div className={GS.formField}>
                <label className={GS.label1}>Item Name</label>
                <input
                className={GS.inputdata}
                type="text"
                placeholder="Item"
                name="itemName" 
                value={itemName}
                onChange={(e)=> setItemName(e.target.value)}
                style={{height: "40px"}}
                ></input>
              </div> 

              <div className={GS.formField}>
                <label className={GS.label1}>Item Name</label>
                <input
                className={GS.inputdata}
                type="number"
                placeholder="Quantity"
                name="itemQty"
                value={itemQty} 
                onChange={(e)=> setItemQty(e.target.value)}
                style={{height: "40px"}}
                ></input>                
              </div> 
            </form>        
                      
            <Button variant="success" type="submit" size="sm" 
              style={{marginTop: "2%", width: "30%"}} 
              onClick={(e) => handleAddClick(e)} value="Add">
              Add Item
            </Button>

            <div style={{width:'100%',marginTop:'20px'}}>
            {
              inputList.map((x, index) => {
                return (
                <div className={GS.card} key={x.itemName} style={{marginTop: "2%", width:"70%"}}>
                  <span>{index+1}. {x.itemName} , Quantity :{x.quantity}  </span>                        
                  <div>
                    <span>
                      <i 
                        className="fas fa-pen"
                        aria-hidden="true"
                        onClick={() => onEdititem(index)}
                      ></i>{" "}
                      &nbsp; &nbsp;
                      <i 
                        className="far fa-trash-alt"
                        onClick={() => onDelete(index)}
                      ></i>                        
                    </span>
                  </div>
                </div>      
                    );
              })
              }
            </div>
            
          
            <label className = {GS.pay}>Payment Preference</label>

            <input type="checkbox" value = "Cash" checked={payment==="Cash"} onChange={(e)=> setPayment(e.target.value)} />
            <label className={GS.options}>Cash</label>

            <input type="checkbox" value = "Paytm" checked={payment==="Paytm"} onChange={(e)=> setPayment(e.target.value)}/>
            <label className={GS.options}>Paytm</label> 

            <input type="checkbox" value = "Gpay" checked={payment==="Gpay"} onChange={(e)=> setPayment(e.target.value)}  />
            <label className={GS.options}>Gpay</label>

            <input type="checkbox" value = "Card" checked={payment==="Card"} onChange={(e)=> setPayment(e.target.value)} />
            <label className={GS.options}>Card</label>

            <label className = {GS.pay}>NO CONTACT DELIVERY </label>
            <input  className ={GS.noContactDCBox} type="checkbox" value={contact} onChange={(e)=> setContact(e.target.value)} />
            <br/>
            
            <label className = {GS.pay}> Is the Requester COVID Positive?</label>
            <input type="checkbox" className={GS.covid} value={covidStatus} onChange={(e)=> setCovidStatus(e.target.value)} />
            <br/>

            <div className={GS.buttons}>
              <Button variant="danger" size="sm" style={{marginTop:'2%',marginRight:'10px'}} type="cancel" onClick={()=>handleCancel()}>Cancel Request</Button>
              <Button variant="success" size="sm" style={{marginTop:'2%'}} type="submit" onClick={()=>handleSubmit()}>Confirm Delivery</Button>
            </div>
        </div>
        </div>
    );

}