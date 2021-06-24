import React from 'react';
import Navbar from '../../global_ui/nav';
import "./requesterProfile.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {useEffect, useState} from 'react';

import Dialog from '../../global_ui/dialog/dialog';

const RequesterProfile=()=>{
    const history = useHistory();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')
    useEffect(
        () => {
            console.log(token)
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/requester/profile',options)
            .then(response => {
                setData(response.data.message);
                console.log(response.data);
            }, error => {
                console.log("An error occured", error);
                setError();
            })

    }, [])


return (error ? (<Dialog isShowing={true} onOK={() => { history.push("/home/requester") }} msg={JSON.stringify(error.message)} />
    ) : (
    <div className="requesterProfileContainer">
        <Navbar back={true} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
        <img></img>
        <label>Full Name:</label>
        
        <span className="name"  >
           {data.name}
        </span>
        <label>Phone Number:</label>
        <span className="phoneNumber">
           {data.phoneNumber}
        </span>
<label>Address:</label>

        <span className="address">
            {data.defaultAddress}
        </span>
        <label>Year Of Birth:</label>
    
        <span className="yearOfBirth">
            {data.yearOfBirth}
        </span>
     {/* should add onClick function to edit button */}
        <button  className="edit">EDIT</button>
        


    </div>
)
)
};

export default RequesterProfile;