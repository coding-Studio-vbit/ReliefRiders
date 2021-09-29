/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useState,useEffect} from "react";
import { AuthContext } from "../../Context/authProvider";
import { fetchOrder } from "./fetchOrder";
import style from './home.module.css'


export default function Home() {

  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [riderName, setriderName] = useState("")
  const [deliveryStatus, setdeliveryStatus] = useState("DELIVERED")
  const [transport, settransport] = useState("CYCLE")
  const [requests, setrequests] = useState();
  const {token} = useContext(AuthContext)
  const [orderID, setorderID] = useState();
  const [request, setrequest] = useState()

  
  


  function fetchRequests() {
    //make http requests to get requests 
    setrequests(allRequests);   
  }

  function filterResults() {
    //http request for sorting    
  }

  async function fetchOrderDetails() {
    const res = await fetchOrder(orderID,token)
    if(res.error){
      alert(res.error)
    }else{
      setrequest(res.data);
    }
    
  }
  
  useEffect(() => {
    fetchRequests();
    console.log(requests);
    return () => {
      
    }
  },) 

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md text-center">
          <div style={styles.admimSections}>

            <div style={styles.title}>Deliveries</div>

            <div style={styles.contentText}>
              <div>
                <input type="date" id="birthday" name="birthday" value={startDate} 
                onChange={(event) => setstartDate(event.target.value)}>
                </input>

                <span style={{ marginRight:'10px',marginLeft:'10px' }}>to</span>

                <input type="date" id="birthday" name="birthday" value={endDate}
                onChange={(event) => setendDate(event.target.value)}>
                </input>
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Rider</div>
              <input type="text" placeholder="Rider's Name" className={style.inputField}
              value={riderName}
              onChange={(event) => setriderName(event.target.value)}
              ></input>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }} className={style.field}>
                Request Status
              </div>
              <select className={style.inputField} value={deliveryStatus} 
              onChange={(e)=>setdeliveryStatus(e.target.value)}>
                <option value="DELIVERED">DELIVERED</option>
                <option value="OUT-FOR-DELIVERY">OUT-FOR-DELIVERY</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }} className={style.field}>
                Mode of Transport
              </div>
              <select className={style.inputField} value={transport} 
              onChange={(e)=>settransport(e.target.value)}>
                <option value="CYCLE" className={style.menuitem}>CYCLE</option>
                <option value="TWO WHEELER">TWO WHEELER</option>
              </select>
            </div>

            <div style={styles.contentText}>
              <br/>            
              <button className={style.btn} onClick={()=>filterResults()}>Apply Filters</button>
            </div>

            <div>
              <table className={style.requests}>
              <tr>
                <th>
                Date
                </th> 
                <th>
                Name
                </th> 
                <th>
                Status
                </th> 
                <th>
                MOT
                </th>
                <th>
                ID
                </th>
              </tr>
              {
                 requests && requests.map((request)=>{
                  return <tr>
                            <td>{request.date}</td>
                            <td>{request.name}</td>
                            <td>{request.requestStatus}</td>
                            <td>{request.modeOfTransport}</td>
                            <td>{request.requesterID}</td>
                        </tr>
                })
              }
              </table>
            </div>
          </div>
        </div>

        <div className="col-md text-center">
          <div style={styles.admimSections}>
            <div style={styles.title}>Search Requests</div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Enter Order ID</div>
              <input type="text" placeholder="Request ID" className={style.inputField}
              value={orderID}
              onChange={(event) => setorderID(event.target.value)}
              ></input>
            </div>
            <div style={styles.contentText}>
              <button className={style.btn} onClick={()=>fetchOrderDetails()}>Fetch Order</button>
            </div>

            {
            request &&
            <div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Rider's Name</div>
              <div>
              {request.riderName}              
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Request's Status</div>
              <div>
              {request.requestStatus}               
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Date</div>
              <div>
              {request.date}               
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Requester's Name</div>
              <div>
              {request.requesterID.name}               
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Request Type</div>
              <div>
              {request.requestType}              
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Delivery Address</div>
              <div>
              {request.dropLocationAddress.address}              
              </div>
            </div>

            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" ,paddingRight:'5px' }}
              className={style.field}
              >Items Requested</div>
              <div>
              {request.itemsListList[0]}              
              </div>
            </div>
            </div> 
            }          
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    color: "#AE1818",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  admimSections: {
    border: "0.05rem solid black",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    height: "90vh",
  },
  contentText: {
    width: "100%",
    textAlign: "left",
    margin: "0.5rem 0.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  
};

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
  riderName:'John',
  requesterName:'Kun',
  date:Date.now(),
  status:'DELIVERED',
  requestType:'GENERAL',
  itemsRequested:[
    'V'
  ],
  location:'dkdk dkdkdk'
}
