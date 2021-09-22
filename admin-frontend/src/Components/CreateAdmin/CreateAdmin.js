import React from 'react';
import GS from "./CreateAdmin.css";
import {Button, Form, Container, Row, Col} from 'react-bootstrap';

const CreateAdmin = () => {
 return (
 <>
 <div>
  <Row>
   <Col>
    <div className = "signup-content">
    
                        <h3 className = "form-title">Create New Admin</h3>
                        <form className = "register-form" id = "register-form">
                        <div>
                        
                        
                        <Form>
                          <Container className={GS.reqdetails}>
                            <div className = "form-group">
                             <Col><label className={GS.label1}>Full Name:</label>
                               <input style={{marginLeft: '20px'}} className={GS.inputdata} type="text" placeholder="Name">
                                   
                               </input>
                               </Col>
                          
                            </div>
                            <div className = "form-group">
                            <br/>
                            <Col>
                            <label className={GS.label1}>Phone Number:</label>
                             <input style={{marginRight: '16px'}} className={GS.inputdata} type="number" placeholder="Phone Number"></input>
                             </Col>
                             <br/>
                          
                            </div>
                            <div className = "form-group">
                            <Col><label className={GS.label1}>OTP:</label>
                            <input style={{margiLeft: '50px'}} className={GS.inputdata} type="number" placeholder="OTP"></input>
                            <Button style={{marginLeft: '15px'}} variant="success" type="submit">Request OTP</Button></Col>

                          
                            </div>
                            </Container>
                            <Container>
                            <br/>
            
                            <Col><Button variant="success" type="submit">Add Admin</Button></Col>
          </Container>
                        
                         </Form>
                         </div>
                        </form>
                </div>
                </Col>

        </Row>
        <br/> <br/> <br/> <br/>
      </div>

      <Col>
      <div className = "riders">
          <Col>
          <h3 className = "form-title">Current Admin List</h3>
          </Col>
          <Container>
          <Col>
          <label className={GS.label1}>Name</label>
          <label style={{marginLeft: '450px'}} className={GS.label1}>Phone Number</label>


          </Col>

          </Container>
      </div>

      </Col>
 </>


    );
}

export default CreateAdmin;