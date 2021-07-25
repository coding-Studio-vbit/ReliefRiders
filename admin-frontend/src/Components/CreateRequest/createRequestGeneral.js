import GS from "./createRequestGeneral.module.css";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
// import { UseState }from 'react';
// import DatePicker from 'react-date-picker';
export default function createRequestGeneral() {
    // const [value, setValue] = UseState(new Date());
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
                <Col><label className={GS.label1}>Full Name:</label></Col>
                <Col><input className={GS.inputdata} type="text" placeholder="Name"></input>
                {/* <DatePicker onChange={setValue} value={value} /> */}
                </Col>
                <Col><label className={GS.label1}>Phone Number:</label></Col>
                <Col><input type="tel" className={GS.inputdata} placeholder="Phone Number"></input></Col>
                <Col><label className={GS.label1}>Location:</label></Col>
                <Col>
                <textarea className={GS.address} rows="3" placeholder="Address"></textarea>
                <input type="text" className={GS.address} placeholder="City"></input>
                <input type="text" className={GS.address} placeholder="Area"></input>
                </Col>
            </Container>
          </Form>
          </div>
        </div>
        </Col>
        <Col>
        <div className={GS.border}>
          <Row style={{marginTop: '1%'}}></Row>
          <Col md="auto"><h5 className={GS.header}>Order Details</h5></Col>
          <br/>
          <Row>
          <Col  className={GS.orderDet}>
          <input
            type="text"
            placeholder="Item"
            name="itemName" 
            style={{height: "40px"}}
            ></input>
          </Col>
          <Col  className={GS.orderDet}><input
            type="number"
            placeholder="Quantity"
            name="itemQty" 
            style={{height: "40px"}}
            ></input>
            </Col>
            
            <Button variant="success" type="submit">Add Item</Button>
          </Row>
          <br/>
          <br/>
          <br/>
          <Container>
            <Col>
            <label className = {GS.pay}>Payment Preference: </label>
                    <input type="checkbox" value = "CASH" />
                    <label className={GS.options}>Cash</label>
                    <input type="checkbox" value = "PAYTM" />
                    <label className={GS.options}>Paytm</label>
                    <input type="checkbox" value = "GPAY" />
                    <label className={GS.options}>G-pay</label>
                    <input type="checkbox" value = "Card" />
                    <label className={GS.options}>Card</label>

            </Col>
            <Col>
                  <label className = {GS.noContact}>NO CONTACT DELIVERY :</label>
                  <input  className ={GS.noContactDCBox} type="checkbox" />
            </Col>
            <Col>
                    <label className = {GS.covidStatus}>Is the Requester COVID Positive ?</label>
                    <input type="checkbox" className={GS.covid} />
            </Col>
            <br/>
            <div className={GS.buttons}>
            <Col><Button variant="danger" type="cancel">Cancel Request</Button></Col>
            <Col><Button variant="success" type="submit">Confirm Delivery</Button></Col>
            </div>
          </Container>
        </div>
        </Col>
        </Row>
        </div>
    );

}