import styles from './pndrequest.module.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSessionStorageState } from "../../../Utils/useLocalStorageState";

export default function PndRequest() {
  const [itemName, setitemName] = useState("");
  const [itemQty, setitemQty] = useState("");
  const [inputList, setInputList] = useState([]);

  const [name, setName]= useState("");
  const [phone, setPhone]= useState("");
  const [date, setdate] = useState()
  const [add1, setAdd1]= useState("");
  const [city1, setCity1]= useState("");
  const [pin1, setPin1]= useState("");
  const [add2, setAdd2]= useState("");
  const [city2, setCity2]= useState("");
  const [pin2, setPin2]= useState("");

  

  
  function handleCancel() {
    //http request for cancelling the form   
  }

  function handleSubmit() {
    //http request for submitting the form 
    if(name==="" || date==="" ||phone==="" ||add1==="" || city1==="" ||pin1==="" ||add2==="" ||city2==="" ||pin2===""){
      if(inputList){
        alert("Invalid Details")
      }
    }
    else{
      //make http request
    }
  }


  const [categories, setcategories] = useSessionStorageState("cat",{
    MEDICINES: false,
    GROCERIES: false,
    MISC: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      setitemName(value);
    }
    if (name === "itemQty") {
      setitemQty(value);
    }
  };
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
      setitemName("");
      setitemQty("");
    }
      console.log(inputList);
    };

    const onEdititem = (index) => {
      setitemName(inputList[index].itemName);
      setitemQty(inputList[index].quantity);
  
      const list = [...inputList];
      list.splice(index, 1);
      setInputList([...list]);
    };

    const onDelete = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList([...list]);
    };

    const _handleCheckBox = (e) => {
      let data = { ...categories };
      data[e.target.name] = e.target.checked;
      setcategories(data);
    };

    return(
      <div style={{marginBottom:'10px'}}>   
            
        <Row>
          {/* contact details of requester column */}
          <Col md="6">  
            <div className={styles.border}>
              <h5 className={styles.header}>
                <strong>Contact Details of Requester</strong>
              </h5>
              <Container className={styles.contactdetails}>
                <Col>
                  <Row style={{marginTop: '5%'}}>
                    <Col md="auto">
                      <h6>Full Name</h6>
                    </Col>
                    <Col>
                      <Form.Control type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} required/>
                    </Col>
                  </Row>

                  <Row style={{marginTop: '2%'}} >
                    <Col md="auto"><h6>Date of Birth</h6></Col>                    
                    <Col md="auto" style={{marginBottom: '1%' }}>
                      <input type="date" id="birthday" name="birthday" value={date} 
                      onChange={(e)=> setdate(e.target.value)}>
                      </input>
                    </Col>
                     
                  </Row>

                  <Row style={{marginTop: '2%'}}>
                    <Col md="auto"><h6>Phone Number</h6></Col>
                    <Col><Form.Control type="tel" placeholder="Phone Number" pattern="[0-9]{10}" maxlength="10" value={phone} onChange={(e)=> setPhone(e.target.value)} required/></Col>
                  </Row>

                  <Row style={{marginTop: '2%'}}>                   
                    <Col md="auto"><h6>Pickup Location</h6></Col>
                    <Col>
                      <Form.Control as="textarea" placeholder="Address Line" rows={3} value={add1} onChange={(e)=> setAdd1(e.target.value)} required/>
                      <Form.Control style={{marginTop: '1%'}} type="text" placeholder="City" value={city1} onChange={(e)=> setCity1(e.target.value)} required/>
                      <Form.Control style={{marginTop: '1%'}} type="tel" placeholder="PINCODE" pattern="[0-9]{6}" maxlength="6" value={pin1} onChange={(e)=> setPin1(e.target.value)} required/>
                    </Col>
                  </Row>

                  <Row style={{marginTop: '2%'}}>
                    <Col md="auto"><h6>Drop Location</h6></Col>
                    <Col>
                      <Form.Control as="textarea" placeholder="Address Line" rows={3} value={add2} onChange={(e)=> setAdd2(e.target.value)} required />
                      <Form.Control style={{marginTop: '1%'}} type="text" placeholder="City" value={city2} onChange={(e)=> setCity2(e.target.value)} required/>
                      <Form.Control style={{marginTop: '1%'}} type="tel" placeholder="PINCODE" pattern="[0-9]{6}" maxlength="6" value={pin2} onChange={(e)=> setPin2(e.target.value)} required/>
                    </Col>
                  </Row>
                </Col>
              </Container>                
            </div>
          </Col>

          {/*  Items to pick up column  */}
          <Col md="6">
            <div className={styles.border2}>
                <h5 className={styles.header}><strong>Items to Pickup</strong></h5>
            <div>
            
            <Form>
              <Container className={styles.contactdetails}>
                <Col  style={{marginTop: '15%'}}>            
                  <Row style={{marginTop: '2%'}}>
                    <Form.Control type="text" placeholder="Item Name" name="itemName" value={itemName} onChange={(e) => handleInputChange(e)} /> 
                  </Row>       
                  <Row style={{marginTop: '2%'}}>
                    <Form.Control type="text" placeholder="Item quantity" name="itemQty" value={itemQty} onChange={(e) => handleInputChange(e)} /> 
                  </Row> 
                  <Row>
                    <button   type="submit" style={{marginTop: "2%",backgroundColor: "green", color: "white", fontWeight: "bold", width: "40%", marginLeft: "20%"}} className={styles.btn} onClick={(e) => handleAddClick(e)} value="Add"> Add</button>  
                  </Row>  
                  
                  <Row>
                    {inputList.map((x, index) => {
                    return (
                      <div className={styles.card} key={x.itemName} style={{marginTop: "2%", width:"70%", marginLeft:"5%"}}>
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

                  <Row style={{marginTop:'20px'}}> 
                    <Col>
                      <div className={styles.checkBox}>
                        <input
                          checked={categories.MEDICINES}
                          onChange={_handleCheckBox}
                          name="MEDICINES"
                          type="checkbox"
                        />
                        <p>MEDICINES</p>
                      </div>
                    </Col>

                    <Col>
                      <div className={styles.checkBox}>
                        <input
                          checked={categories.GROCERIES}
                          onChange={_handleCheckBox}
                          name="GROCERIES"
                          type="checkbox"
                        />
                        <p>GROCERIES</p>
                      </div>
                    </Col> 
                    
                    <Col>
                      <div className={styles.checkBox}>
                        <input
                          checked={categories.MISC}
                          onChange={_handleCheckBox}
                          name="MISC"
                          type="checkbox"
                        />
                        <p>MISC</p>
                      </div>
                    </Col>                  
                  </Row>       
                </Col>
              </Container>
            </Form>
          </div>
        </div>
        </Col>
      </Row> 
                     
        {/*  buttons for cancelling or placing request */}
        <div className={styles.buttons}>
          <Row  md="auto" style={{marginLeft:'36%'}}>
            <Col xs lg="3">
              <Button variant="danger" size="sm"  style={{marginTop:'2%'}} type="cancel" onClick={()=>handleCancel()}>Cancel Request
              </Button>
            </Col>
            <Col xs lg="3">
              <Button variant="success" size="sm" style={{marginTop:'2%'}} type="submit" onClick={()=>handleSubmit()}>Place Request
              </Button>
            </Col>
          </Row>
        </div>
      </div>   
    );
}
