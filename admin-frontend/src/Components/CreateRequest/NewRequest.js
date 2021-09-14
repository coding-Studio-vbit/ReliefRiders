import React from 'react'
import { Card } from 'react-bootstrap'


function NewRequest() {
    return (
        <div style={{
            display:'flex',
            justifyContent:'space-evenly',
            justifyItems:'center',
            marginTop:'40px',
            flexDirection:'row',
        }}>
            <Card style={{ maxWidth: '18rem',backgroundColor:'grey',maxHeight:'50vh' }}>
                <Card.Body>
                    <Card.Title style={{color:'white'}}>Card Title</Card.Title>
                </Card.Body>
            </Card>
            <Card style={{ maxWidth: '18rem',backgroundColor:'grey',maxHeight:'50vh' }}>
                <Card.Body>
                    <Card.Title style={{color:'white'}}>Card Title</Card.Title>
                </Card.Body>
            </Card>
            
        </div>
    )
}

export default NewRequest
