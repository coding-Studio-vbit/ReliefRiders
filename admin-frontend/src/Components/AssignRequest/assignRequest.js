import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import styles from './assignrequest.module.css';
import { useState,useEffect} from "react";

export default function AssignRequest() {
  const [orderID, setorderID] = useState();
  const [request, setrequest] = useState();
  const [requests, setrequests] = useState();
  const [assignedRider, setAssignedRider] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState();
  const [riderName, setRiderName]=useState();
 

  const [adminList, setadminList] = useState([])
  const [details, setDetails] = useState([]);

  function assignRequest() {
    //http request 
     request.riderID= assignedRider;
  }

  function fetchOrderDetails() {
 
    setrequest(req);      
  }

  function fetchAdminList() {
    setadminList(al)    
  }

  function selectOrder(){
       setSelectedOrderID(req.orderID)
  }

  useEffect(() => {
    fetchAdminList();
  },)

  return(
    <div>
      <div className={styles.border}>
        <h5 className={styles.header}>Assign Request</h5>
        <p className={styles.pow}>Choosen order has to be a pending order</p>
        {/* Search Order ID */}
        <div>
          <Form>
            <Container className={styles.ordersearch}>
              <Row>
                <Col>
                  <Form.Control type="email" placeholder="Enter Order ID #" value={orderID}
                    onChange={(event) => setorderID(event.target.value)}/>
                </Col>
                <Col>
                  <Button style={{backgroundColor:'#263238', color:'white',borderRadius:'5px',padding:'7px'}} 
                  onClick={()=>fetchOrderDetails()}>Fetch Order</Button>
                </Col>
              </Row>
              <Row>
                  <Col>
                   <h5 >Order Selected</h5>
                  </Col>
                  <Col>
                    <p>{selectedOrderID}</p>
                  </Col>
              </Row>
            </Container>
          </Form>
        </div>
        

        {/* Request Details */}
        {
          request &&
        <div className={styles.border2}>
          <Row style={{marginTop: '1%'}}>
            <Col md="auto"><h6>Request Status:</h6></Col>
            <Col md='auto'><div>{req.status}</div></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Date:</h6></Col>
            <Col md='auto'><div style={{color: 'blue'}} value={request.date} ></div></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Requester Name:</h6></Col>
            <Col md='auto'><div> {req.requesterName}</div></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Request Type:</h6></Col>
            <Col md='auto'><div>{req.requestType}</div></Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Delivery Address/Location</h6></Col>
            <Col md='auto'><div>{req.address}</div></Col>
          </Row>
          <h6 style={{marginTop: '2%'}}>Items Requested:</h6>
          <div>
          <Col md='auto'><div>{req.itemsList}</div></Col>
          </div>
          <Button style={{backgroundColor:'#263238', color:'white',borderRadius:'5px',padding:'7px', justifyItems:'center'}} 
                  onClick={()=>selectOrder()}>Select Order</Button>
          </div>
}
           
         
            
        {/* Assign Request Search Bar */}
        <div style={{marginTop: '3%'}}>
          <Form>
            <Container>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Assign Request:</Form.Label>
                
                <Col sm="10">
                  <input type="text" placeholder="Enter Rider Name" value={riderName} onChange={(e)=> setRiderName(e.target.value)}/>
                </Col>
                
              </Form.Group>
            </Container>
          </Form>
        </div>

        {/* Header */}
        <div style={{marginTop: '2%'}}>
          <div className={styles.border4}>
            <Row style={{textAlign: 'center', alignItems: 'center'}}>
              <Col><h6>Name</h6></Col>
              <Col><h6>Deliveries Completed</h6></Col>
              <Col><h6>Assign Request</h6></Col>
            </Row>
          </div>         
            {
               adminList.map((admin)=>{
                return <div className={styles.border3}>
                          <Row style={{textAlign: 'center', alignItems: 'center'}}>
                            <Col><h6>{admin.name}</h6></Col>
                            <Col><h6>{admin.phoneNumber}</h6></Col>
                            <Col><Button variant="dark" type="submit" onClick={()=>assignRequest()}>Assign</Button></Col>
                          </Row>
                        </div>
                      })
            }
          </div>
        </div>
      </div>
  );
}
        
const allRequests=[
  {
    date:'12',
    name:'Pr',
    requestStatus:'DELIVERED',
    modeOfTransport:'Bike',
    requesterID:'12929303'
  },
  {
    date:'12',
    name:'Ab',
    requestStatus:'DELIVERED',
    modeOfTransport:'Bike',
    requesterID:'12929303'
  },
  {
    date:'12',
    name:'No',
    requestStatus:'DELIVERED',
    modeOfTransport:'Bike',
    requesterID:'12929303'
  },
  {
    date:'12/10/2022',
    name:'Ap',
    requestStatus:'DELIVERED',
    modeOfTransport:'Bike',
    requesterID:'12929303'
  }
]
const req={
    orderID: 196532,
    status:"PENDING",
  date:Date(),
  requesterName:'Kun',
  requestType:'GENERAL',
  address:'uejdheiker, jeryereyr, heuyfwjefh',
  itemsList:[
    'V'
  ],
}


const al=[
  { riderID: 1234,phoneNumber:'955072929',name:'Dh'},
  { phoneNumber:'959072929',name:'Th'},
]
