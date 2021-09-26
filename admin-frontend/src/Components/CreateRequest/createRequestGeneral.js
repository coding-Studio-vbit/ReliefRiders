import GS from "./createRequestGeneral.module.css";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import React from "react";
import { useState } from "react";

// import DatePicker from 'react-date-picker';


export default function CreateRequestGeneral() {
     const [value, setValue] = useState(new Date());
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
      //http request for submitting the form    
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
        <div>
          <Row>
          <Col>
          <div className={GS.border}>
        <h5 className={GS.header}>Requester Details</h5>
        <br/>
        <div>
          <Form>
            <Container className={GS.reqdetails}>
              
                <Col md='auto'><label className={GS.label1}>Full Name:</label></Col>
                <Col md='auto'><input className={GS.inputdata} type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}></input>
                <Col><label className={GS.label1}>Date of Birth:</label></Col>
                <input type="date" id="DateOfBirth" placeholder="DoB" value={startDate} 
                onChange={(event) => setstartDate(event.target.value)}>
                </input>

                </Col>
                <Col md='auto'><label className={GS.label1}>Phone Number:</label></Col>
                <Col md='auto'><input type="tel" className={GS.inputdata} placeholder="Phone Number" value={phone} onChange={(e)=> setPhone(e.target.value)}></input></Col>
                <Col md='auto'><label className={GS.label1}>Location:</label></Col>
                <Col md='auto'>
                <textarea className={GS.address} rows="3" placeholder="Address" value={address} onChange={(e)=> setAddress(e.target.value)}></textarea>
                <input type="text" className={GS.address} placeholder="City" style={{marginTop:"1%"}} value={city} onChange={(e)=> setCity(e.target.value)}></input>
                <input type="text" className={GS.address} placeholder="Area" style={{marginTop:"1%"}} value={area} onChange={(e)=> setArea(e.target.value)}></input>
                </Col>
            </Container>
          </Form>
          </div>
        </div>
        </Col>
        <Col >
        <div className={GS.border}>
          <Row style={{marginTop: '1%'}}></Row>
          <Col md="auto"><h5 className={GS.header}>Order Details</h5></Col>
          <br/>
          <Row >
          <Col md='6' style={{marginLeft:"50%"}}className={GS.orderDet} style={{marginTop:'1%'}}>
          <input
            type="text"
            placeholder="Item"
            name="itemName" 
            value={itemName}
            onChange={(e)=> setItemName(e.target.value)}
            style={{height: "40px"}}
            ></input>
          </Col>
          <Col md="6" style={{marginLeft: "20%"}} className={GS.orderDet} style={{marginTop:'1%'}}><input
            type="number"
            placeholder="Quantity"
            name="itemQty"
            value={itemQty} 
            onChange={(e)=> setItemQty(e.target.value)}
            style={{height: "40px"}}
            ></input>
            </Col>
            
            <Button  variant="success" type="submit" style={{marginTop: "2%", width: "40%", marginLeft: "20%"}} onClick={(e) => handleAddClick(e)} value="Add">Add Item</Button>
            {inputList.map((x, index) => {
                   return (
                     <div className={GS.card} key={x.itemName} style={{marginTop: "2%", width:"70%", marginLeft:"5%"}}>
                           <span>{x.itemName}  |  {x.quantity} </span>                        
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
          </Row>
          <br/>
          <br/>
          <br/>
          <Container>
            <Col md="auto" >
            <label className = {GS.pay}>Payment Preference: </label>
                    <input type="checkbox" value = "Cash" checked={payment==="Cash"} onChange={(e)=> setPayment(e.target.value)} />
                    <label className={GS.options}>Cash</label>
                    <input type="checkbox" value = "Paytm" checked={payment==="Paytm"} onChange={(e)=> setPayment(e.target.value)}/>
                    <label className={GS.options}>Paytm</label>
                    <input type="checkbox" value = "Gpay" checked={payment==="Gpay"} onChange={(e)=> setPayment(e.target.value)}  />
                    <label className={GS.options}>Gpay</label>
                    <input type="checkbox" value = "Card" checked={payment==="Card"} onChange={(e)=> setPayment(e.target.value)} />
                    <label className={GS.options}>Card</label>

            </Col>
            <Col md="auto">
                  <label className = {GS.noContact}>NO CONTACT DELIVERY :</label>
                  <input  className ={GS.noContactDCBox} type="checkbox" value={contact} onChange={(e)=> setContact(e.target.value)} />
            </Col>
            <Col md="auto" >
                    
                    <label className = {GS.covidStatus}>Is the Requester COVID Positive ?</label>
                    <input type="checkbox" className={GS.covid} value={covidStatus} onChange={(e)=> setCovidStatus(e.target.value)} />
            </Col>
            <br/>
            <div className={GS.buttons}>
            <Col md='auto'><Button variant="danger" style={{marginTop:'2%'}} type="cancel" onClick={()=>handleCancel()}>Cancel Request</Button></Col>
            <Col md='auto' ><Button variant="success" style={{marginTop:'2%'}} type="submit" onClick={()=>handleSubmit()}>Confirm Delivery</Button></Col>
            </div>
          </Container>
        </div>
        </Col>
        </Row>
        </div>
    );

}