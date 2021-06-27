import React from 'react';
import Navbar from '../../global_ui/nav';
import styles from "./RequesterProfile.module.css"
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Button from '../../global_ui/buttons/button'

import {LoadingScreen} from '../../global_ui/spinner';
import Dialog from '../../global_ui/dialog/dialog';

const RequesterProfile=()=>{
    const history = useHistory();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')
    const [isLoaded, setisLoaded] = useState(false);

    function stateChange() {
        setTimeout(function () {
        }, 5000);
    }

    useEffect(
        async () => {
            console.log(token)
            const options = {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
            axios.get('http://localhost:8000/requester/profile',options)
            .then(response => {
                setData(response.data.message);
                setisLoaded(true);
                setTimeout(() => {
                }, 5000);
                setError(null)
            }, error => {
                console.log("An error occured", error);
                setError(error.toString());
                setisLoaded(true);
            })
    }, [])


    return (
        isLoaded?  
        (
            error?
            <Dialog 
            isShowing={error} 
            onOK={() => {
                //  history.push("/home/requester") 
                setError(false)
            }} 
            msg={"Profile Not Loaded"} />
            :
            <div className={styles.requesterProfileContainer}>

            <Navbar back={true} backStyle={{ color: 'white' }} title="My Account" titleStyle={{ color: 'white' }} style={{ backgroundColor: '#79CBC5', marginBottom: "10px" }} />
            
            <img></img>

            <label>Full Name</label>
            
            <span>
            {data.name}
            </span>

            <label>Phone Number</label>
            <span >
            {data.phoneNumber}
            </span>

            <label>Address</label>
            <span>
                {data.defaultAddress}
            </span>

            <label>Year Of Birth</label>        
            <span>
                {data.yearOfBirth}
            </span>
            
            <div></div>

            <Button
                bgColor="green"
                isRounded="true"
                text="EDIT"
                fontSize="17px"
            />           

        </div>
        )    
        
        :
        <LoadingScreen />
        )
    };

export default RequesterProfile;