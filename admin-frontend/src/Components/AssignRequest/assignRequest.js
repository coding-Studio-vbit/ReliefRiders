import { Button, Row, Col} from 'react-bootstrap';
import styles from './assignrequest.module.css';
import { useState,useEffect} from "react";

export default function AssignRequest() {
  const [orderID, setorderID] = useState();
  const [request, setrequest] = useState();
  const [assignedRiderID, setAssignedRider] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [riderName, setRiderName]=useState("");
  const [adminList, setadminList] = useState([]);
  
  function assignRequest(i,name) {
    if(selectedOrderID===null){
      alert("Select Order to Assign")
    }
    else{
    setAssignedRider(i);
    //http request 
    alert(`Rider ${name} ${assignedRiderID} assigned with ${selectedOrderID}`);
    }
  }

  function fetchOrderDetails() {
    //http request 
    setrequest(req);      
  }

  function selectOrder(){
    setSelectedOrderID(req.orderID)
  }

  function selectOrder(){
       setSelectedOrderID(req.orderID)
  }

  useEffect(() => {
    fetchRiderList();
  },)

  return(
    <div>
      <div className={styles.border}>
        <h5 className={styles.header}>Assign Request</h5>
        <p className={styles.pow}>Choosen order has to be a pending order</p>

        {/* Search Order ID */}
        <div>
          <form>
            <div className={styles.ordersearch}>             
              <div className={styles.name}>
                <input type="text" placeholder="Order ID" 
                value={orderID} className={styles.inputField}              
                onChange={(event) => setorderID(event.target.value)} required/>

                <Button                 
                size="sm"
                onClick={()=>fetchOrderDetails()}>
                Fetch Order
                </Button>
              </div>
              {
                selectedOrderID &&
                <div>               
                  <p>Order Selected {selectedOrderID}</p>          
                </div>
              }
                  
            </div>
          </form>
        </div>
        

        {/* Request Details */}
        {
          request &&
        <div className={styles.border2}>
          <Row style={{marginTop: '1%'}}>
            <Col md="auto"><h6>Request Status:</h6></Col>
            <Col md='auto'><div>{request.status}</div></Col>
          </Row>

          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Date:</h6></Col>
            <Col md='auto'><div>{request.date}</div></Col>
          </Row>

          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Requester Name:</h6></Col>
            <Col md='auto'><div> {request.requesterName}</div></Col>
          </Row>

          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Request Type:</h6></Col>
            <Col md='auto'><div>{request.requestType}</div></Col>
          </Row>

          <Row style={{marginTop: '2%'}}>
            <Col md="auto"><h6>Delivery Address/Location</h6></Col>
            <Col md='auto'><div>{request.address}</div></Col>
          </Row>
          <h6 style={{marginTop: '2%'}}>Items Requested:</h6>
          <div>
          <Col md='auto'>
            <ul>
            {
              request.itemsList.map((item)=>{
                return <li>{item.name} : {item.quantity}</li>
              })
            }
            </ul>
          </Col>
          </div>
          <Button style={{marginTop:'10px',backgroundColor:'#263238', color:'white',borderRadius:'5px',padding:'7px', justifyItems:'center'}} 
            size="sm"      onClick={()=>selectOrder()}>Select Order</Button>
          </div>
}
           
         
            
        {/* Assign Request Search Bar */}
        <div style={{marginTop: '3%'}}>
          <form>
            <div className={styles.ordersearch}> 
                <div>             
                <label column sm="2">Assign Request</label>                
                <input type="text" 
                style={{marginLeft:'10px'}}
                className={styles.inputField}
                placeholder="Enter Rider Name" value={riderName} onChange={(e)=> setRiderName(e.target.value)}/>
                </div>
            </div>
          </form>
        </div>

        {/* Header */}
        {
          riderList.length>0 ?
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
                return (riderName==="" || admin.name.includes(riderName) ) && <div className={styles.border3}>
                          <Row style={{textAlign: 'center', alignItems: 'center'}}>
                            <Col><h6>{admin.name}</h6></Col>
                            <Col><h6>{admin.phoneNumber}</h6></Col>
                            <Col><Button variant="dark" type="submit" onClick={()=>assignRequest(admin.riderID,admin.name)}>Assign</Button></Col>
                          </Row>
                        </div>
                  
                })
                    
            }
          </div>
          :
          <p style={{textAlign:'center',marginTop:'20px',fontWeight:'600'}}>Failed to fetch Riders List</p>
        }
        
        </div>
      </div>
  );
}
        
// const allRequests=[
//   {
//     date:'12',
//     name:'Pr',
//     requestStatus:'DELIVERED',
//     modeOfTransport:'Bike',
//     requesterID:'12929303'
//   },
//   {
//     date:'12',
//     name:'Ab',
//     requestStatus:'DELIVERED',
//     modeOfTransport:'Bike',
//     requesterID:'12929303'
//   },
//   {
//     date:'12',
//     name:'No',
//     requestStatus:'DELIVERED',
//     modeOfTransport:'Bike',
//     requesterID:'12929303'
//   },
//   {
//     date:'12/10/2022',
//     name:'Ap',
//     requestStatus:'DELIVERED',
//     modeOfTransport:'Bike',
//     requesterID:'12929303'
//   }
// ]
const req={
  orderID: 196532,
  status:"PENDING",
  date: Date().toString(),
  requesterName:'Kun',
  requestType:'GENERAL',
  address:'uejdheiker, jeryereyr, heuyfwjefh',
  itemsList:[
    {
      name:'Butter',
      quantity:'100grams x 2'
    },
    {
      name:'Cheese',
      quantity:'100grams x 2'
    }
  ],
}


const al=[
  { riderID: 1234,phoneNumber:'955072929',name:'Shravan'},
  { riderID: 1234,phoneNumber:'959072929',name:'Vimal'},
  { riderID: 1234,phoneNumber:'959072929',name:'Kamal'},
  { riderID: 1234,phoneNumber:'959072929',name:'Shravanthi'},
]
